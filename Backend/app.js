
const mongoose = require ('mongoose');

const url = 'mongodb://localhost:27017/Harmonize-db';

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const User = mongoose.model('User', userSchema);

async function run() {
    try {
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Connected to MongoDB');

        const user = new User({name:'John Doe', age: 30});
        await user.save();
        console.log('Document saved:', user);

        const foundUser = await User.findOne({name:'John Doe'});
        console.log('Found document:',foundUser);

    }finally{
        await mongoose.connection.close();
    }
}

run().catch(console.error);