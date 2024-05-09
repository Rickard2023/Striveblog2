import { Router } from "express";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import cloudinaryMiddleware from "../middlewares/multer.js";
import cloudinaryMiddlewareCovers from "../middlewares/multerCover.js";
// Creiamo un nuovo Router e esportiamolo per essere utilizzato altrove
import bcrypt from "bcrypt";

export const userRoute = Router();

// create new user
userRoute.post("/users", async (req, res, next) => {
    try {
        // Creiamo un nuovo documento utente, con i valori presi dal body della richiesta
        let user = await User.create(req.body);
        user.password = await bcrypt.hash(user.password,10);

        // Mandiamo in risposta l'utente creato e un status code di 400 (successo)
        res.send(user).status(400);
    } catch (err) {
        // In caso di errore, procediamo
        next(err);
    }
});

// delete user
userRoute.delete("/users/:id", async (req, res, next) => {
    try {
      // Cerchiamo un documento utente usando una query specificia: deve avere l'id uguale a quello passato come parametro all'indirizzo
      await User.deleteOne({
        _id: req.params.id,
      });
      // Mandiamo un messaggio in risposta ed uno status code di 204
      res.send("L'utente è stato eliminato correttamente").status(204);
    } catch (err) {
      // In caso di errore, procediamo
      next(err);
    }
  });

// get users
userRoute.get("/users", async (req, res, next) => {
    try {
      console.log(req.body);
      // Cerchiamo un documento utente con l'id uguale a quello passato come parametro
      let users = await User.find();
      // Mandiamo in risposta al client l'utente trovato
      res.send(users);
    } catch (err) {
      // In caso di errore, procediamo
      next(err);
    }
});

// get specific user
userRoute.get("/users/:userID", async (req, res, next) => {
    try {
      console.log(req.body);
      // Cerchiamo un documento utente con l'id uguale a quello passato come parametro
      let user = await User.findById(req.params.userID);
      // Mandiamo in risposta al client l'utente trovato
      res.send(user);
    } catch (err) {
      // In caso di errore, procediamo
      next(err);
    }
});

// get all user's posts
userRoute.get("/users/:userID/posts", async (req, res, next) => {
    try {
      console.log(req.body);
      // Cerchiamo un documento utente con l'id uguale a quello passato come parametro
      let allPosts = await Post.find();
      if(!allPosts)
        return;

      let userPosts = [];
     
      for(let singlePost of allPosts)
      {     
         if(singlePost.author == req.params.userID){
            userPosts.push(singlePost);
         }
      }

      console.log(userPosts);
      res.send(userPosts);
    } catch (err) {
      // In caso di errore, procediamo
      next(err);
    }
});

// add the password component to the user
userRoute.patch("/users/:userID/:par/:val", async(req,res,next) => {
  
    const id = req.params.userID;
    let user = await User.findById(id);
    if(!user) return res.status(404).send("user not found");

    
    try {
      const par = req.params.par;
      const val = req.params.val;
      user = await User.findByIdAndUpdate(id, {
          [par]: val
        },
        {new: true}
      )
      res.send(user);
    }
    catch(err){
      res.status(404).send(err);
    }
})  

export default userRoute;