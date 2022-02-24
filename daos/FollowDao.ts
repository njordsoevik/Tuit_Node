/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} userDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static FollowDao: FollowDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if(FollowDao.FollowDao === null) {
            FollowDao.FollowDao = new FollowDao();
        }
        return FollowDao.FollowDao;
    }
    private constructor() {}

     /**
     * Uses FolowModel to retrieve all user documents receieved from follows collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersThatFollowUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({followee: uid})
            .populate("follower")
            .exec();

     /**
     * Uses FolowModel to retrieve all user documents receieved from follows collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersFollowedByUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({follower: uid})
            .populate("followee")
            .exec();

     /**
     * Uses FolowModel to create a follow document in the follows collection
     * @param {string} uid User's primary key
     * @param {string} fid User's primary key
     * @returns Promise To be notified when the follow is created in the
     * database
     */
    userFollowsUser = async (uid: string, fid: string): Promise<any> =>
        FollowModel.create({followee: uid, follower: fid});

     /**
     * Uses FolowModel to delete a follow document from follows collection
     * @param {string} uid User's primary key
     * @param {string} fid User's primary key
     * @returns Promise To be notified when the follow is deleted in the
     * database
     */
    userUnFollowsUser = async (uid: string, fid: string): Promise<any> =>
        FollowModel.deleteOne({followee: uid, follower: fid});

     /**
     * Uses FolowModel to delete all follows document from follows collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the follow is deleted in the
     * database
     */
    userUnFollowsAllUsers = async (uid: string): Promise<any> =>
        FollowModel.deleteMany({follower: uid});
        
    // userFollowsAllFollowers = async (uid: string): Promise<any> =>
    //     FollowModel.createMany({follower: uid});

}