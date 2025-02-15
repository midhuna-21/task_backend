import { task } from "../model/taskModel.js";

const createTask = async (req, res) => {
   try {
       const { title, description, dueDate, priority } = req.body;

       if (!title || !description || !dueDate || !priority) {
           return res.status(400).json({
               message: "Please ensure all required fields are filled out.",
           });
       }
       const newTask = await new task({
           title,
           description,
           dueDate,
           priority,
           status:'In Progress'
       }).save()
  
       return res.status(200).json({ task:newTask });
   } catch (error) {
       console.error(error.message);
       return res.status(400).json({ message: "Internal server error" });
   }
};

const taskList = async (req, res) => {
    try {
     
        const { status, page = 1, limit = 5 } = req.query;
        const query = status && status !== "all" ? { status } : {};
        const tasks = await task
            .find(query)
            .sort({ updatedAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalTasks = await task.countDocuments(query);

        return res.status(200).json({
            tasks,
            totalPages: Math.ceil(totalTasks / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ message: "Internal server error" });
    }
};

 const editTask = async (req, res) => {
    try {
        const {task_id}=req.params;
        const { title, description, dueDate, priority } = req.body;

        const findTask = await task.findById({_id:task_id})
        const newTask = await new task({
            title: title || findTask.task,
            description: description || findTask.description,
            dueDate: dueDate || findTask.dueDate,
            priority: priority ||  findTask.priority
        }).save()
      
        return res.status(200).json({ task:newTask });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ message: "Internal server error" });
    }
 };
 const deleteTask = async (req, res) => {
    try {
        const { task_id } = req.params;
        const deleteTask = await task.findByIdAndDelete({_id:task_id})
      
        return res.status(200).json({message:"Task Deleted successfully"});
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ message: "Internal server error" });
    }
 };
 const updateTaskStatus = async (req, res) => {
    try {
        const { task_id } = req.body;
        const updateStatus = await task.findByIdAndUpdate({_id:task_id},{status:status})
      
        return res.status(200).json({message:"Task Status Updated successfully"});
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ message: "Internal server error" });
    }
 };

 const fetchTask = async (req, res) => {
    try {
        const { task_id } = req.params;
        const fetchTask = await task.findById({_id:task_id})
      
        return res.status(200).json({task:fetchTask});
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ message: "Internal server error" });
    }
 };

 const fetchAllTasks = async (req, res) => {
    try {
        const tasks = await task.find().sort({ updatedAt: -1 });
      
        return res.status(200).json({ tasks });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ message: "Internal server error" });
    }
 };
export {
   createTask,
   taskList,
   editTask,
   deleteTask,
   updateTaskStatus,
   fetchTask,
   fetchAllTasks
}