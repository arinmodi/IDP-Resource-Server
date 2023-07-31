const userModel = require("../../../modals/User");
const { default : to } = require("await-to-js");

const addUser = async (data) => {
    const [ err ] = await to(userModel.create(data));
    if (err) return err;
    return null;
}

module.exports = {
    addUser
}