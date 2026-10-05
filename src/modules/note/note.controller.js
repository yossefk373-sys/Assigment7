import { Router } from "express";
import { create_note, delete_note, get_note, get_noteby_content, Get_noteby_tittle, get_notebyuser, replace_note, update_All, update_note } from "./note.service.js";
const noterouter=Router()


noterouter.post("/",create_note)
noterouter.patch("/:id",update_note)
noterouter.put("/:id",replace_note)
noterouter.patch("/all",update_All)
noterouter.delete("/:id",delete_note)
noterouter.get("/content",get_noteby_content)
noterouter.get("/:id",get_note)
noterouter.get("/note-with-user",get_notebyuser)
noterouter.get("/aggregate/title",Get_noteby_tittle)







export default noterouter