const mongoose = require('mongoose')

async function connectDB(){
    const URL_DB = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.jxjeemt.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
    try {
        let DB = await mongoose.connect(URL_DB,{useNewUrlParser: true,useUnifiedTopology: true})
        console.log('Connected to ', DB.connection.name);
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = connectDB;