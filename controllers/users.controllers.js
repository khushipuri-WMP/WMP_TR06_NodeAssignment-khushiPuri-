const { read, write } = require("../utils/fileHandler");
const path = require("path");
const dirName = path.join(__dirname, "../userData/data.json");

// ========================== Functions to get users ====================== //

/**
 * Function to get all users data..
 * @param {*} req - Express Request object.
 * @param {*} res - Express response object.
 */
const getUserData = (req, res) => {
    try {
        const items = read(dirName);   // Reading the data from the file
        res.status(200).json(items);
    }
    catch {
        res.status(500).send("Internal Server Error!");     // handling error and sending the response
    }
};

/**
 * Function to get the user data of specified id 
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 * @returns returns the user data of specified id or error message 
 */
const getUserById = (req, res) => {
    try {
        const id = parseInt(req.params.id);    // Parsing the user ID from the route parameter
        const items = read(dirName);       // Reading the existing data from the file
        const itemIndex = items.findIndex((data) => data.id === id);      // Finding the index of the user with the given ID
        // console.log(items[itemIndex]);
        // checking if the user is not found and returns an error
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(items[itemIndex]);    // sending respond with a success
    } catch {
        res.status(500).send("Internal Server Error!")
    }
};

//================================ Route for post the user =============================== //

/**
 * Function to post the new users data
 * If already exists then throws error
 * @param {*} req - Express request object for adding new user data.
 * @param {*} res - Express response object for adding the new data.
 * @returns sends the response 
 */
const postUserData = (req, res) => {
    try {
        const items = read(dirName);  // Reading existing items from the file
        const { name, city, username, ...extraFields} = req.body;    // Extracting the new user data from the request body
        // Validating the required fields
        if (!name || !city || !username) {
            return res.status(400).json({ message: 'Name, city, and username are required.' });
        }
        // Validating that entered name, city and username if a string
        if (typeof name !== 'string' || typeof city !== 'string' || typeof username !== 'string') {
            return res.status(400).json({ message: 'Name, city, and username must all be strings.' });
        }
        // Checking  if the extra fields are present
        if (Object.keys(extraFields).length > 0) {
            return res.status(400).json({
                message: 'Unexpected fields in the request body. Only name, city, and username are allowed.'
            });
        }
        // Checking if a user with the same username already exists
        const usernameExists = items.some((item) => item.username === username);
        if (usernameExists) {
            return res.status(409).json({ message: 'User with this username already exists!' });
        }
        // To determine the next auto-incremented ID
        const nextId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;  
        const newData = { id: nextId, name, city, username };   // To create the new user object with the auto-incremented ID
        items.push(newData);    // Adding the new user to the array
        write(dirName, items);       // Writing the updated data back to the file
        res.status(201).json(newData);
    } catch (error) {
        res.status(500).send("Internal Server Error!");    // Handling errors and sending an appropriate response
    }
};

//================================ Route for put the user =============================== //
/**
 * Function to update the user data of specified id
 * throws error if user does not exists
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @returns - returns the resposne or error
 */
const updateUserData = (req, res) => {
    try {
        const id = parseInt(req.params.id);    // Parsing the user ID from the route parameter
        const items = read(dirName);    // Reading existing data from the file
        const itemIndex = items.findIndex((data) => data.id === id);     // Finding the index of the user with the given ID
        // If the user is not found, returns an error
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'User not found!' });
        }
        const { name, city, username, ...extraFields} = req.body;    // Extracting the fields from the request body
        // Validating required fields
        if (!name || !city || !username) {
            return res.status(400).json({ message: 'Name, city, and username are required.' });
        }
        // Validating data types
        if (typeof name !== 'string' || typeof city !== 'string' || typeof username !== 'string') {
            return res.status(400).json({ message: 'Name, city, and username must all be strings.' });
        }

        // Check if extra fields are present
        if (Object.keys(extraFields).length > 0) {
            return res.status(400).json({
                message: 'Unexpected fields in the request body. Only name, city, and username are allowed.'
            });
        }
        // Update the user's information
        items[itemIndex].name = name;
        items[itemIndex].city = city;
        items[itemIndex].username = username;
        write(dirName, items);   // Writing the updated data back to the file
        res.status(200).json({ message: 'User updated successfully!' });   // sending respond with a success
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error!' });   // Handling errors and sending an appropriate response
    }
};


// ======================== Function to delete the user ======================== // 
/**
 * Function to delete the user data of specified id..
 * @param {*} req Express request body..
 * @param {*} res Express response body..
 * @returns throws error if user doer not exists...
 */
const deleteUserData = (req, res) => {
    try {
        const id = parseInt(req.params.id);   //   Parse the user ID from the route parameter
        // console.log(id);
        const items = read(dirName);    //  Reading existing data from the file
        const itemIndex = items.findIndex((data) => data.id === id);     //  Finding the index of the user with the given ID
        // checking if the user is not found and returns an error
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Items not found' });
        }
        // removing the user
        const deletedItem = items.splice(itemIndex, 1);
        write(dirName, items);  //   Writing the updated data back to the file
        res.status(200).json({ message: 'Items deleted successfully', item: deletedItem });
    } catch {
        res.status(500).send("Internal server error!");    //  handing the error and giving response
    }
};

// exposting the function as an module
module.exports = {
    getUserData,
    getUserById,
    postUserData,
    updateUserData,
    deleteUserData
};

