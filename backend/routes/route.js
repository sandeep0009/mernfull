import { Router } from "express";
import { getUserId, login, signin ,getUserDetails} from "../controllers/users.js";
import { createPost, deleteNote, getNotes, getNotesById, getPdfNote, updateNotes } from "../controllers/notes.js";
import { authVerification } from "../middleware/auth.js";
import { checkout } from "../controllers/payment.js";

const route=Router();

route.post('/singup',signin);
route.post('/login',login);
route.get('/getUserId',authVerification,getUserId)
route.get('/userDetails',authVerification,getUserDetails)

route.post('/createnotes',authVerification,createPost)

route.get('/getNotesId',authVerification,getNotesById)
route.get('/getnotes',authVerification,getNotes)


route.patch('/updatenote/:id',authVerification,updateNotes)
route.delete('/deletenote',authVerification,deleteNote)

route.get('/downloadPdfCopy',authVerification,getPdfNote)


route.post('/checkout',authVerification,checkout)
export default route;