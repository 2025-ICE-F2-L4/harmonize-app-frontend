require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Family, Activity, UserActivity } = require('./Schema');

const app = express();
app.use(express.json());

// Configuration
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;

if (!JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Authentication middleware
const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

// Signup (Registration) Endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return success response with token (excluding password)
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      },
      token
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return success response with token (excluding password)
    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login' });
  }
});

// Create a new family
app.post('/api/families', authenticate, async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user._id;

    // Validate input
    if (!name) {
      return res.status(400).json({ message: 'Family name is required' });
    }

    // Generate a random access code (6 digits)
    const access_code = Math.floor(100000 + Math.random() * 900000).toString();

    // Create the family
    const newFamily = new Family({
      name,
      access_code
    });

    await newFamily.save();

    // Update the user's family association
    await User.findByIdAndUpdate(userId, {
      family_id: newFamily._id
    });

    res.status(201).json({
      message: 'Family created successfully',
      family: {
        id: newFamily._id,
        name: newFamily.name,
        access_code: newFamily.access_code
      }
    });

  } catch (error) {
    console.error('Family creation error:', error);
    res.status(500).json({ message: 'Error creating family' });
  }
});

// Join existing family
app.post('/api/families/join', authenticate, async (req, res) => {
  try {
    const { access_code } = req.body;
    const userId = req.user._id;

    if (!access_code) {
      return res.status(400).json({ message: 'Access code is required' });
    }

    // Find family by access code
    const family = await Family.findOne({ access_code });
    if (!family) {
      return res.status(404).json({ message: 'Family not found with this access code' });
    }

    // Update user's family association
    await User.findByIdAndUpdate(userId, {
      family_id: family._id
    });

    res.json({
      message: 'Joined family successfully',
      family: {
        id: family._id,
        name: family.name
      }
    });

  } catch (error) {
    console.error('Join family error:', error);
    res.status(500).json({ message: 'Error joining family' });
  }
});

// Create a new activity
app.post('/api/activities', authenticate, async (req, res) => {
  try {
    const { name, description, datetime, family_id } = req.body;
    
    // Validate required fields
    if (!name || !datetime || !family_id) {
      return res.status(400).json({ message: 'Name, datetime, and family_id are required' });
    }

    // Check if family exists
    const family = await Family.findById(family_id);
    if (!family) {
      return res.status(404).json({ message: 'Family not found' });
    }

    // Check if user belongs to this family
    const user = await User.findById(req.user._id);
    if (!user.family_id || user.family_id.toString() !== family_id) {
      return res.status(403).json({ message: 'Not authorized to create activities for this family' });
    }

    // Create new activity
    const newActivity = new Activity({
      name,
      description,
      datetime,
      family_id
    });

    await newActivity.save();

    res.status(201).json({
      message: 'Activity created successfully',
      activity: newActivity
    });

  } catch (error) {
    console.error('Activity creation error:', error);
    res.status(500).json({ message: 'Error creating activity' });
  }
});

// Get all activities for a family
app.get('/api/families/:familyId/activities', authenticate, async (req, res) => {
  try {
    const { familyId } = req.params;

    // Check if user belongs to this family
    const user = await User.findById(req.user._id);
    if (!user.family_id || user.family_id.toString() !== familyId) {
      return res.status(403).json({ message: 'Not authorized to view activities for this family' });
    }

    // Find all activities for this family
    const activities = await Activity.find({ family_id: familyId });

    res.json({
      message: 'Activities retrieved successfully',
      activities
    });

  } catch (error) {
    console.error('Get activities error:', error);
    res.status(500).json({ message: 'Error retrieving activities' });
  }
});

// Assign user to activity
app.post('/api/activities/:activityId/assign', authenticate, async (req, res) => {
  try {
    const { activityId } = req.params;
    const { userId } = req.body;

    // Check if activity exists
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Check if user exists
    const userToAssign = await User.findById(userId);
    if (!userToAssign) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if both users belong to the same family
    const currentUser = await User.findById(req.user._id);
    if (currentUser.family_id.toString() !== userToAssign.family_id.toString()) {
      return res.status(403).json({ message: 'Cannot assign users from different families' });
    }

    // Check if assignment already exists
    const existingAssignment = await UserActivity.findOne({
      user_id: userId,
      activity_id: activityId
    });

    if (existingAssignment) {
      return res.status(409).json({ message: 'User is already assigned to this activity' });
    }

    // Create new assignment
    const newAssignment = new UserActivity({
      user_id: userId,
      activity_id: activityId
    });

    await newAssignment.save();

    res.status(201).json({
      message: 'User assigned to activity successfully',
      assignment: newAssignment
    });

  } catch (error) {
    console.error('Assignment error:', error);
    res.status(500).json({ message: 'Error assigning user to activity' });
  }
});

  

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});