import mongoose from 'mongoose';
const { Schema } = mongoose;

const imageSchema=new Schema({
    photo:{
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    }
},{timestamps: true});

export default mongoose.model("Images", imageSchema);