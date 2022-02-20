import {Request, Response} from "express";

export default interface BookmarkControllerI {
    findAllUsersThatFollowUser (req: Request, res: Response): void;
    findAllUsersFollowedByUser (req: Request, res: Response): void;
    userFollowsUser (req: Request, res: Response): void;
    userUnFollowsUser (req: Request, res: Response): void;
    userFollowsAllFollowers (req: Request, res: Response): void;
};