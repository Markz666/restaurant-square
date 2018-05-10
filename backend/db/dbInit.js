const bcrypt = require("bcrypt");
const usersAPI = require("./users.js");

const createAdminUser = async () => {
    const username = "admin";
    const password = "admin123";
    const email = "admin@admin.com";
    const phone = "";

    try {
        const saltRounds = 4;
        let hashed_password = await bcrypt.hash(password, saltRounds);
        await usersAPI.addUser(username, hashed_password, email, phone);
        console.log("Create user " + username + " success!");
    } catch (e) {
        const user = await usersAPI.getUserByUsername(username);
        console.log("User " + username + " already exists");
    }
}

createAdminUser();