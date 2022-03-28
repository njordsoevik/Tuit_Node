import {Request, Response} from "express";

export default interface DislikeControllerI {
    userTogglesTuitDislikes (req: Request, res: Response): void;
    findAllUsersThatDislikedTuit (req: Request, res: Response): void;
    findAllTuitsDislikedByUser (req: Request, res: Response): void;
};