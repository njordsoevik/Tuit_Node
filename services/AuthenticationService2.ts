import UserDao from "../daos/UserDao";
import mongoose from "mongoose";

const userDao: UserDao = UserDao.getInstance();
mongoose.connect('mongodb+srv://nsoevik:England11@cluster0.9uq33.mongodb.net/test')

export const login = async (u: string, p: string) => {
  try {
    const user = await userDao.findUserByCredentials(u, p);
    if (!user) {
      throw "Unknown user";
    }
    return user;
  } catch (e) {
    return e;
  }
}

export const register = async (u: string, p: string, e: string) => {
  try {
    const user = await userDao.findUserByUsername(u);
    if (user) {
      throw 'User already exists';
    }
    const newUser = await userDao.createUser({username: u, password: p, email: e});
    return newUser;
  } catch (e) {
    return e;
  }
}

export const initializeSalaries = async (salary: number) => {
  const users = await userDao.findAllUsers()
  const salaryPromises = users.map(user =>
    userDao.updateUserSalaryByUsername(user.username, salary));
  const values = await Promise.all(salaryPromises);
  return values;
}

register('alice678', 'alice234', 'alice234@gmail.com')

login('alice678', 'alice234')
// login('alice', 'alice123')

// userDao.findAllUsers()
//     .then(users => console.log(users));