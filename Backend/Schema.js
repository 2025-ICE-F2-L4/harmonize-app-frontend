const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Parent', 'Child'], required: true },
  family_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Family' }
});

// Family Schema
const familySchema = new mongoose.Schema({
  name: { type: String, required: true },
  access_code: { type: String, required: true, unique: true }
});

// Activity Schema
const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  datetime: { type: Date, required: true },
  family_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Family' }
});

// User_Activity Schema
const userActivitySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  activity_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true }
});

// Notification Schema
const notificationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  datetime: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Set'], required: true }
});

// Activity_Suggestion Schema
const activitySuggestionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], required: true }
});

// Create Models
const User = mongoose.model('User', userSchema);
const Family = mongoose.model('Family', familySchema);
const Activity = mongoose.model('Activity', activitySchema);
const UserActivity = mongoose.model('UserActivity', userActivitySchema);
const Notification = mongoose.model('Notification', notificationSchema);
const ActivitySuggestion = mongoose.model('ActivitySuggestion', activitySuggestionSchema);

// Export Models
module.exports = {
  User,
  Family,
  Activity,
  UserActivity,
  Notification,
  ActivitySuggestion
};