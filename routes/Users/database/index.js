const userModel = require("../../../modals/User");
const { default : to } = require("await-to-js");

const addUser = async (data) => {
    const [ err ] = await to(userModel.create(data));
    if (err) return err;
    return null;
}

const getUserByEmail = async (data) => {
    const result = await userModel.find({ Email : data });
    return result;
}

const updateUserDetails = async (data, email) => {
    const [ err, result ] = await to(userModel.findOneAndUpdate({ email : email }, { $set :  data}));

    if (err) {
        return false;
    }

    return true;
}

module.exports = {
    addUser, getUserByEmail, updateUserDetails
}