# Basic API Application

This is a simple backend application to manage user information stored in a file. It allows you to add, view, update, and delete users.
It is a simple API build with node.js to manage the user data.

# Features 
- Add User: Create a new user by providing their name, city, and username.
- View Users: See all users or get details of a specific user.
- Update User: Modify an existing user's details.
- Delete User: Remove a user by their ID.

# Technologies Used
- Node.js: For backend functionality.
- Express.js: To handle API routes.
- File System (fs): To read and write data to a JSON file.
- How to Run
- Clone the repository and navigate to the folder:

Copy code
git clone < https://github.com/khushipuri-WMP/WMP_TR06_NodeAssignment-khushiPuri-.git >

# Install dependencies:

- npm install
- Start the server:

- node index.js
- The server runs on port 5001.

# API Endpoints

- Add User:Used to add new user to the databse.

- --POST </api/users>
- --Add a new user with name, city, and username.

- Get All Users: Used to get all the User data.

- --GET </api/users>
- --View all users.

- Get User by ID: Used to get the User data of specified id.

- --GET </api/users/:id>
- --Get details of a specific user.

- Update User: Used to update the user data. 

- --PUT </api/users/:id>
- --Update a user's name, city, and username.

- Delete User: Used to Delete the user data of specified id.

- --DELETE </api/users/:id>
- --Remove a user by ID.

# Schema
- User Schema
- The user data is stored in a JSON file and follows this structure:
```
# json
{
   "id": 1,              // Auto-generated unique ID
   "name": "John Doe",   // User's name (string)
   "city": "New York",   // User's city (string)
   "username": "johndoe" // Unique username (string)
}
```

# Body Format

```
# body
{
    "name": "simson",
    "city": "noida",
    "username": "simson1996"
}
```
# Notes
- Data is stored in a data.json file.
- Use tools like Postman or cURL to test the APIs.
- The app handles errors and gives clear messages for missing or invalid inputs.