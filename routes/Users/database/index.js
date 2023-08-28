const userModel = require("../../../modals/User");
const { default : to } = require("await-to-js");

const addUser = async (data) => {
    const [ err ] = await to(userModel.create(data));
    if (err) return err;
    return null;
}

const getUserByEmail = async (data) => {
    const result = await userModel.find({ Email : data, isDeleted : false });
    return result;
}

const getUserAccessHistory = async (email) => {
    const result = await userModel.find({ Email : email, isDeleted : false });
    if (result[0].AccessHistory===undefined) return {}
    return result[0].AccessHistory;
}

const updateUserDetails = async (data, email) => {
    const [ err, result ] = await to(userModel.findOneAndUpdate({ email : email }, { $set :  data}));

    if (err) {
        return false;
    }

    return true;
}

const addAccessHistory  = async (website, fields, email) => {
    const user =  await userModel.find({ Email : email, isDeleted : false });
    if (user[0].AccessHistory===undefined) {
        user[0].AccessHistory = {}
    } 
    user[0].AccessHistory.set(website, fields);
    const [err] = await to(user[0].save());
    if (err) return err;
    return null;
}

module.exports = {
    addUser, getUserByEmail, updateUserDetails, addAccessHistory, getUserAccessHistory
}