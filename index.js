const express = require('express');   
const app = express();       // initializing the express application

require('dotenv').config();

app.use(express.json()); //For parsing the user data

app.use("/api/users", require("./routes/userroutes"));

// ======================== Start the server ===================== //

const PORT = process.env.PORT || 5003;
app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`);  
});
