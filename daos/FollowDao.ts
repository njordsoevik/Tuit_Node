import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

export default class FollowDao implements FollowDaoI {
    private static FollowDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.FollowDao === null) {
            FollowDao.FollowDao = new FollowDao();
        }
        return FollowDao.FollowDao;
    }
    private constructor() {}
    findAllUsersThatFollowUser = async (uid: string): Promise<Follow[]> => // TODO: Should this return User[]
        FollowModel
            .find({followee: uid})
            .populate("follower")
            .exec();
    findAllUsersFollowedByUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({follower: uid})
            .populate("followee")
            .exec();
    userFollowsUser = async (uid: string, fid: string): Promise<any> =>
        FollowModel.create({followee: uid, follower: fid});
    userUnFollowsUser = async (uid: string, fid: string): Promise<any> =>
        FollowModel.deleteOne({followee: uid, follower: fid});
    userUnFollowsAllUsers = async (uid: string): Promise<any> =>
        FollowModel.deleteMany({follower: uid});
    // userFollowsAllFollowers = async (uid: string): Promise<any> =>
    //     FollowModel.createMany({follower: uid});

}