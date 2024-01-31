import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const URI = process.env.URI;

const conn = async () => {
   try{ await mongoose.connect(URI)
        console.log("Database Connected");
   }
    catch (e) {console.error("error: ", e);
  }
}

export default conn;