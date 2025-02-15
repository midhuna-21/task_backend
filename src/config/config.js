import dotenv from 'dotenv';
dotenv.config()

export default {
   PORT:process.env.PORT,
   MONGODB_URI:process.env.MONGODB_URI,
   API_URL:process.env.API_URL
}  