const uuidv4 = require("uuid/v4");
const mongoCollections = require("./mongoCollections");
const users = mongoCollections.users;

module.exports.addUser = async (user_name, hashed_password, email, phone) => {
    if (typeof user_name !== "string" || typeof hashed_password !== "string")
        throw "Username or password is not recognized";

    let newUser = {
        _id: uuidv4(),
        user_name: user_name,
        hashed_password: hashed_password,
        email: email,
        phone: phone,
        comments: [],
        favorites: []
    };

    try {
        await this.getUserByUsername(user_name);
    } catch (e) {
        const userCollection = await users();
        const newInsertInfo = await userCollection.insertOne(newUser);
        const userId = await newInsertInfo.insertedId;

        return await this.getUserById(userId);
    }

    throw "User already exists";
};

module.exports.addComment = async (user_id, comment_id) => {
    if (typeof user_id !== "string")
        throw "Invalid user id";

    if (typeof comment_id !== "string")
        throw "Invalid comment id";

    const userCollection = await users();
    const oldUser = await this.getUserById(user_id);

    let updatedUserData = {
        comments: oldUser.comments
    };
    updatedUserData.comments.push(comment_id);

    let updateCommand = {
        $set: updatedUserData
    };
    await userCollection.updateOne({_id: user_id}, updateCommand);
    return await this.getUserById(user_id);
};

module.exports.removeComment = async (user_id, comment_id) => {
    const userCollection = await users();
    const oldUser = await this.getUserById(user_id);

    let updatedUserData = {
        comments: oldUser.comments.filter(e => e !== comment_id)
    };

    let updateCommand = {
        $set: updatedUserData
    };
    await userCollection.updateOne({_id: user_id}, updateCommand);
    return await this.getUserById(user_id);
};

module.exports.addFavorite = async (user_id, movie_id) => {
    if (typeof user_id !== "string")
        throw "Invalid user id";

    if (typeof movie_id !== "string")
        throw "Invalid movie id";

    const userCollection = await users();
    const oldUser = await this.getUserById(user_id);

    let updatedUserData = {
        favorites: oldUser.favorites
    };
    if (!updatedUserData.favorites.includes(movie_id))
        updatedUserData.favorites.push(movie_id);

    let updateCommand = {
        $set: updatedUserData
    };
    await userCollection.updateOne({_id: user_id}, updateCommand);
    return await this.getUserById(user_id);
};

module.exports.removeFavorite = async (user_id, movie_id) => {
    const userCollection = await users();
    const oldUser = await this.getUserById(user_id);

    let updatedUserData = {
        favorites: oldUser.favorites.filter(e => e !== movie_id)
    };

    let updateCommand = {
        $set: updatedUserData
    };
    await userCollection.updateOne({_id: user_id}, updateCommand);
    return await this.getUserById(user_id);
};

module.exports.updateUser = async (id, updatedUser) => {
    const userCollection = await users();

    let updatedUserData = {};
    if (updatedUser.user_name) {
        updatedUserData.user_name = updatedUser.user_name;
    }
    if (updatedUser.hashed_password) {
        updatedUserData.hashed_password = updatedUser.hashed_password;
    }

    if (updatedUser.email) {
        updatedUserData.email = updatedUser.email;
    }
    if (updatedUser.phone) {
        updatedUserData.phone = updatedUser.phone;
    }
    if (updatedUser.comments) {
        updatedUserData.comments = updatedUser.comments;
    }
    if (updatedUser.favorites) {
        updatedUserData.favorites = updatedUser.favorites;
    }

    let updateCommand = {
        $set: updatedUserData
    };
    await userCollection.updateOne({_id: id}, updateCommand);
    return await this.getUserById(id);
};

module.exports.removeUserById = async (id) => {
    const userCollection = await users();
    const deleteInfo = await userCollection.removeOne({_id: id});
    if (deleteInfo.deletedCount === 0) {
        throw `Could not delete user ${id}`;
    }
};

module.exports.removeUserByUsername = async (user_name) => {
    const userCollection = await users();
    const deleteInfo = await userCollection.removeOne({user_name: user_name});
    if (deleteInfo.deletedCount === 0) {
        throw `Could not delete user ${user_name}`;
    }
};

module.exports.getAllUsers = async () => {
    const userCollection = await users();
    return await userCollection.find().toArray();
};


module.exports.getUserById = async (id) => {
    const userCollection = await users();
    const user = await userCollection.findOne({_id: id});
    if (!user)
        throw "User not found";
    return user;
};

module.exports.getUserByUsername = async (user_name) => {
    const userCollection = await users();
    const user = await userCollection.findOne({user_name: user_name});
    // if (!user)
    //     return "User not found";
    return user;
};
