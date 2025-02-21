const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // Validate
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email ' + params.email + ' is already registered';
    }

    const user = new db.User(params);

    // Hash password
    user.passwordHash = await bcrypt.hash(params.password, 10);

    // Save user
    await user.save();
}

async function update(id, params) {
    const user = await getUser(id);

    // Validate if username is changed
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username ' + params.username + ' is already taken';
    }

    // Hash password if it was entered
    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
    }

    // Copy params to user and save
    Object.assign(user, params);
    await user.save();
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// Helper function
async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}