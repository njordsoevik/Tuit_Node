/**
 * @file Controller RESTful Web service API for follows resource
 */
 import {Express, Request, Response} from "express";
 import FollowDao from "../daos/FollowDao";
 import FollowControllerI from "../interfaces/FollowControllerI";
 
 /**
  * @class TuitController Implements RESTful Web service API for follows resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /api/users/:uid/follows to retrieve all the users followed by a user
  *     </li>
  *     <li>GET /api/users/:uid/followers to retrieve all users that followed a user
  *     </li>
  *     <li>POST /api/users/:uid/follows/:rid to record that a user follows a user
  *     </li>
  *     <li>DELETE /api/users/:uid/unfollows/:rid to record that a user
  *     no longer follows a user</li>
  * </ul>
  * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
  * @property {FollowController} FollowController Singleton controller implementing
  * RESTful Web service API
  */
 export default class FollowController implements FollowControllerI {
     private static followDao: FollowDao = FollowDao.getInstance();
     private static followController: FollowController | null = null;
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return TuitController
      */
     public static getInstance = (app: Express): FollowController => {
         if(FollowController.followController === null) {
             FollowController.followController = new FollowController();
             app.get("/api/users/:uid/follows", FollowController.followController.findAllUsersFollowedByUser);
             app.get("/api/users/:uid/followers", FollowController.followController.findAllUsersThatFollowUser);
             app.post("/api/users/:uid/follows/:rid", FollowController.followController.userFollowsUser);
             app.delete("/api/users/:uid/follows/:rid", FollowController.followController.userUnFollowsUser);
             app.delete("/api/users/:uid/follows", FollowController.followController.userUnFollowsAllUsers);
             //app.post("/api/users/:uid/followers", FollowController.followController.userFollowsAllFollowers);
         }
         return FollowController.followController;
     }
 
     private constructor() {}
 
     /**
      * Retrieves all users that followed a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter tid representing the followed user
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
      */
     findAllUsersThatFollowUser = (req: Request, res: Response) =>
         FollowController.followDao.findAllUsersThatFollowUser(req.params.uid)
             .then(follows => res.json(follows));
 
     /**
      * Retrieves all users followed by a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user followed the users
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects that were followed
      */
     findAllUsersFollowedByUser = (req: Request, res: Response) =>
         FollowController.followDao.findAllUsersFollowedByUser(req.params.uid)
             .then(follows => res.json(follows));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is following the user
      * and the user being followed
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new follows that was inserted in the
      * database
      */
     userFollowsUser = (req: Request, res: Response) =>
         FollowController.followDao.userFollowsUser(req.params.uid, req.params.rid)
             .then(follows => res.json(follows));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is unfollowing
      * the user and the user being unfollowed
      * @param {Response} res Represents response to client, including status
      * on whether deleting the follows was successful or not
      */
      userUnFollowsUser = (req: Request, res: Response) =>
         FollowController.followDao.userUnFollowsUser(req.params.uid, req.params.rid)
             .then(status => res.send(status));

     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is unfollowing
      * the user and the user being unfollowed
      * @param {Response} res Represents response to client, including status
      * on whether deleting the follows was successful or not
      */
      userUnFollowsAllUsers = (req: Request, res: Response) =>
         FollowController.followDao.userUnFollowsAllUsers(req.params.uid)
             .then(status => res.send(status));

     /**
      * @param {Request} req Represents request from client, including the
      * path parameter ui representing the user that is unfollowing
      * the users
      * @param {Response} res Represents response to client, including status
      * on whether deleting the follows was successful or not
      */
    //   userFollowsAllFollowers = (req: Request, res: Response) =>
    //      FollowController.followDao.userFollowsAllFollowers(req.params.uid)
    //          .then(status => res.send(status));
 };