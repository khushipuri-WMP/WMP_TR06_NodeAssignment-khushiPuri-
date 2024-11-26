const fs = require('fs');
const path = require('path');        // importing the path module to work with the files

// =============== Function to read from file ===================== //
/**
 * Function to read data from the file...
 * @returns throws Error if the not able to read from the file
 */
const read = (dirName) => {
    try {
        const data = fs.readFileSync(dirName, 'utf8'); // Ensuring 'utf8' encoding is specified
        return JSON.parse(data);    // Parses the JSON string into a JavaScript object and return it
    } catch (error) {
        console.error("Error reading or parsing the file:", error.message);
        let errmsg = error.message;
        let response = `Error reading from file: ${errmsg}`;
        return response; // will return null or handle the error as appropriate
    }
};

// ============================ Function to write in a file ================== //
/**
 * Funtion to write in the file...
 * And Throes Error if something happens....
 * @param {*} items - array of json data.
 * @returns - returns the error if any error occurs.
 */
const write = (dirName, items) => {
    try {
        fs.writeFileSync(dirName, JSON.stringify(items, null, 2), 'utf8'); // Ensuring UTF-8 encoding
        console.log("File written successfully.");
    } catch (error) {
        console.error("Error writing to the file:", error.message); // Throw error if not able to write in the file
        let errormsg = error.message;
        const resp = `Error while writing in the file: ${errormsg}`;
        return resp;
    }
};

// Exporting the read and write function

module.exports = {
    read,
    write
};