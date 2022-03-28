import {Request, Response} from "express";

export default interface DislikeControllerI {
    userTogglesTuitDislikes (req: Request, res: Response): void;
};