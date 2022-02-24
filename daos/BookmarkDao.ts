/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static BookmarkDao: BookmarkDao | null = null;
    
    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.BookmarkDao === null) {
            BookmarkDao.BookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.BookmarkDao;
    }
    private constructor() {}
    /**
     * Uses BookmarkModel to retrieve all user documents receieved from bookmarks collection
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersThatBookmarkedTuit = async (tid: string): Promise<Bookmark[]> => // TODO: Should this return User[]
        BookmarkModel
            .find({tuit: tid})
            .populate("bookmarkedBy")
            .exec();

     /**
     * Uses BookmarkModel to retrieve all tuit documents receieved from bookmarks collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedBy: uid})
            .populate("tuit")
            .exec();

    /**
     * Uses BookmarkModel to create single bookmark document in bookmarks collection
     * @param {string} uid User's primary key
     * @param {string} tid User's primary key
     * @returns Promise To be notified when the follow is created in
     * database
     */   
    userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({tuit: tid, bookmarkedBy: uid});

        
    /**
     * Uses BookmarkModel to delete all of a user's bookmark documents in bookmarks collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the bookmarks are deleted in
     * database
     */   
    userUnBookmarksAllTuit = async (uid: string): Promise<any> =>
        BookmarkModel.deleteMany({bookmarkedBy: uid});
 
    /**
     * Uses BookmarkModel to delete a user's bookmark document in bookmarks collection
     * @param {string} uid User's primary key
     * @param {string} tid User's primary key
     * @returns Promise To be notified when the bookmarks are deleted in
     * database
     */   
    userUnBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({tuit: tid, bookmarkedBy: uid});
}