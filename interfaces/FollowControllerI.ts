import {Request, Response} from "express";

/**
 * @file Declares API methods for Bookmarks related data access object methods
 */
export default interface FollowControllerI {
    findAllUsersThatFollowUser (req: Request, res: Response): void;
    findAllUsersFollowedByUser (req: Request, res: Response): void;
    userFollowsUser (req: Request, res: Response): void;
    userUnFollowsUser (req: Request, res: Response): void;
    userUnFollowsAllUsers (req: Request, res: Response): void;
    //userFollowsAllFollowers (req: Request, res: Response): void;
};