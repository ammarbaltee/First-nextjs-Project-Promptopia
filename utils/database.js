import mongoose from 'mongoose';

let isConnected = false;  //track the connection 

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  
  if(isConnected) {
    console.log('MongooseDB is already connected');
    return; //if we want to stop it from running
  }
// if not then
  try {
    //to establish connection write this line of code
    await mongoose.connect(process.env.MONGODB_URI, {  
        dbName: "share_prompt",  
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    })

    isConnected = true;

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error);
  }
}