import { Router } from "express";
import {  delete_user, get_users, signin, signup, update_user } from "./user.service.js";
const userrouter=Router()


userrouter.post("/signup",signup)
userrouter.post("/signin",signin)
userrouter.patch("/:id",update_user)
userrouter.delete("/:id",delete_user)
userrouter.get("/:id",get_users)





export default userrouter