import express from "express";
import {
    createNewUser,
    authenticateUser, 
    
}from "../controllers/userController.js";
import {createTask,taskList,editTask,deleteTask,updateTaskStatus,fetchTask,fetchAllTasks} from '../controllers/taskController.js'

import { userVerifyToken } from "../utils/middleware/userAuthMiddleware.js";
import { userRefreshToken } from "../controllers/userRefreshToken.js";

const userRoutes = express.Router();

userRoutes.post("/refresh-token", userRefreshToken);

userRoutes.post("/register", createNewUser);


userRoutes.post("/login", authenticateUser);

//tasks
userRoutes.post('/task/create',userVerifyToken,createTask)

userRoutes.get('/tasks',userVerifyToken,taskList)

userRoutes.get('/alltasks',userVerifyToken,fetchAllTasks)

userRoutes.put('/task/edit/:task_id',userVerifyToken,editTask)

userRoutes.get('/task/:task_id',userVerifyToken,fetchTask)

userRoutes.delete('/task/delete/:task_id',userVerifyToken,deleteTask)

userRoutes.post('/task/update/status',userVerifyToken,updateTaskStatus)

export default userRoutes;
