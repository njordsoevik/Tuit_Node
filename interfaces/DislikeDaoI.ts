import Like from "../models/dislikes/Dislike";

/**
 * @file Declares API for Dislikes related data access object methods
 */
export default interface DislikeDaoI {
    userUndislikesTuit (tid: string, uid: string): Promise<any>;
    userDislikesTuit (tid: string, uid: string): Promise<Like>;
};