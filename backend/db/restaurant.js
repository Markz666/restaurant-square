const uuidv4 = require("uuid/v4");
const mongoCollections = require("./mongoCollections");
const restaurants = mongoCollections.restaurants;

module.exports.addRestaurant = async (restaurant_id) => {
    if (typeof restaurant_id !== "string")
        throw "restaurant id is not recognized";

    let newRestaurant = {
        _id: restaurant_id,
        comments: [],
        favorites: []
    };

    const restaurantsCollection = await restaurants();
    const newInsertInfo = await restaurantsCollection.insertOne(newRestaurant);
    const restaurantId = await newInsertInfo.insertedId;
    console.log(restaurantId);
    return newRestaurant;
};

module.exports.addComment = async (restaurant_id, user_id, comment) => {
    if (typeof restaurant_id !== "string")
        throw "Invalid user id";

    if (typeof restaurant_id !== "string")
        throw "Invalid movie id";

    if (typeof comment !== "string")
        throw "Invalid comment";

    const restaurantsCollection = await restaurants();
    const oldRestaurant = await this.getRestaurantById(restaurant_id);

    let updatedData = {
        comments: oldRestaurant.comments
    };

    let commentData = ({user_id:user_id, comment:comment}};
    updatedData.comments.push(commentData);

    let updateCommand = {
        $set: updatedData
    };
    await restaurantsCollection.updateOne({_id: restaurant_id}, updateCommand);
    return await this.getRestaurantById(restaurant_id);
};

module.exports.addFavorite = async (restaurant_id, user_id) => {
    if (typeof restaurant_id !== "string")
        throw "Invalid restaurant id";

    if (typeof user_id !== "string")
        throw "Invalid user id";

    const restaurantsCollection = await restaurants();
    const oldRestaurant = await this.getRestaurantById(restaurant_id);

    let updatedData = {
        favorites: oldRestaurant.favorites
    };
    if (!updatedData.favorites.includes(user_id))
        updatedData.favorites.push(user_id);

    let updateCommand = {
        $set: updatedData
    };
    await restaurantsCollection.updateOne({_id: restaurant_id}, updateCommand);
    return await this.getRestaurantById(restaurant_id);
};

module.exports.removeFavorite = async (restaurant_id, user_id) => {
    if (typeof restaurant_id !== "string")
        throw "Invalid restaurant id";

    if (typeof user_id !== "string")
        throw "Invalid user id";

    const restaurantsCollection = await users();
    const oldRestaurant = await this.getRestaurantById(restaurant_id);

    let updatedData = {
        favorites: oldRestaurant.favorites.filter(e => e !== user_id)
    };

    let updateCommand = {
        $set: updatedUserData
    };
    await userCollection.updateOne({_id: restaurant_id}, updateCommand);
    return await this.getRestaurantById(restaurant_id);
};

module.exports.getAllRestaurants = async () => {
    const restaurantsCollection = await restaurants();
    return await restaurantsCollection.find().toArray();
};


module.exports.getRestaurantById = async (id) => {
    const restaurantsCollection = await restaurants();
    const restaurant = await restaurantsCollection.findOne({_id: id});
    // if (!user)
    //     throw "User not found";
    return restaurant;
};