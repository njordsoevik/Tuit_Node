import Follow from "../models/follows/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
    findAllUsersThatFollowUser (tid: string): Promise<Follow[]>;
    findAllUsersFollowedByUser (uid: string): Promise<Follow[]>;
    userFollowsUser (tid: string, uid: string): Promise<any>;
    userUnFollowsUser (tid: string, uid: string): Promise<Follow>;
    userUnFollowsAllUsers (uid: string): Promise<any>; 
    //userFollowsAllFollowers (uid: string): Promise<any>;
};