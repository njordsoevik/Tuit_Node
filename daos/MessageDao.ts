/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} userDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static MessageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if(MessageDao.MessageDao === null) {
            MessageDao.MessageDao = new MessageDao();
        }
        return MessageDao.MessageDao;
    }
    private constructor() {}
    
    /**
     * Uses MessageModel to retrieve all message documents receieved from messages collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findAllMessagesReceived = async (uid: string): Promise<Message[]> => 
        MessageModel
            .find({userReceived: uid});

    /**
     * Uses MessageModel to retrieve all message documents sent from messages collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findAllMessagesSent = async (uid: string): Promise<Message[]> =>
        MessageModel.find({userSent: uid});

    /**
     * Uses MessageModel to retrieve all message documents to another user from messages collection
     * @param {string} sender User's primary key
     * @param {string} receiver User's primary key
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findAllMessagesToUser = async (sender: string, receiver: string): Promise<any> =>
        MessageModel.find({userSent: sender, userReceived: receiver});

    /**
     * Uses UserModel to create single message document in messages collection
     * @param {string} sender User's primary key
     * @param {string} receiver User's primary key
     * @param {string} message Contents
     * @returns Promise To be notified when the message is created in
     * database
     */   
    userMessagesUser = async (sender: string, receiver: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, userSent: sender, userReceived: receiver});

    /**
     * Uses MessageModel to delete all message documents to another user from messages collection
     * @param {string} sender User's primary key
     * @param {string} receiver User's primary key
     * @returns Promise To be notified when the messages are deleted from
     * database
     */
    userDeletesAllMessagesToUser = async (sender: string, receiver: string): Promise<any> =>
        MessageModel.deleteMany({userSent: sender, userReceived: receiver});
    
    /**
     * Uses MessageModel to delete a message document to another user from messages collection
     * @param {string} mid Message id
     * @returns Promise To be notified when the messages are deleted from
     * database
     */
    deleteMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});
}