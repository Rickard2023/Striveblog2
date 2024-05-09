import { Router } from "express";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import cloudinaryMiddleware from "../middlewares/multer.js";
import cloudinaryMiddlewareCovers from "../middlewares/multerCover.js";

// Creiamo un nuovo Router e esportiamolo per essere utilizzato altrove
export const commentRoute = Router();

// create new comment on a post
commentRoute.post("/comments/:postID/:userID", async (req, res, next) => {
    try {
        // Creiamo un nuovo documento utente, con i valori presi dal body della richiesta
        let commentedPost = await Post.findById(req.params.postID);
        if(!commentedPost) 
            return;

        let user = await User.findById(req.params.userID);
        if(!user)
            return;

        let userComment = await Comment.create(req.body);
        userComment.user = user._id;
        userComment.post = req.params.postID;
        // Mandiamo in risposta l'utente creato e un status code di 400 (successo)
        res.send(userComment).status(400);
    } catch (err) {
        // In caso di errore, procediamo
        next(err);
    }
});

// get all comments from a post
commentRoute.get("/comments/:postID", async (req, res, next) => {
    try {
      console.log(req.body);
      let post = await Post.findById(req.params.postID);
      if(!post)
        return;

     let allComments = await Comment.find();
     let postComment = [];
     for(let userComment of allComments){
        if(userComment.post == req.params.postID){
            postComment.push(userComment);
        }
     }

      res.send(postComment);
    } catch (err) {
      next(err);
    }
});




export default commentRoute;