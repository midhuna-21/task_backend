import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
       
        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
        },
      dueDate:{
        type:Date
      },
      status:{
        type: String,
        enum: ["Not completed", "In progress", "Completed"],
      }
    },
    { timestamps: true }
);

const task = mongoose.model("tasks", taskSchema);
export { task };
