const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const dirName = path.join(__dirname, 'data.json');
const PORT = 5003;


app.use(express.json());

// =============== Function to read from file ===================== //
const read = () => {
    const data = fs.readFileSync(dirName);
    return JSON.parse(data);
};

// ============================ Function to write in a file ================== //

const write = (items) => {
    fs.writeFileSync(dirName, JSON.stringify(items, null, 2));
};

// =========================== Route for post ===================== //
app.post('/api/users', (req, res) => {
    try {
        const items = read();
        const newData = req.body;
        if (!req.body.id || !req.body.name || !req.body.city) {
            return res.json({ message: 'Id, name and city is required' });
        };
        const alreadyExists = items.some((data) => data.id === req.body.id);
        // console.log(alreadyExists);
        if(alreadyExists){
            return res.json({ message: "User already Exists !"});
        }
        items.push(newData);
        write(items);
        res.json(newData);
    }
    catch {
        res.send("Internal Server Error! ");
    }
});

// ========================== Route for get ====================== //
app.get('/api/users', (req, res) => {
    try {
        const items = read();
        res.json(items);
    }
    catch {
        res.send("Internal Server Error!");
    }
});
app.get('/api/users/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const items = read(dirName);
        const itemIndex = items.findIndex((data) => data.id === id);
        // console.log(itemIndex);
        // console.log(items[itemIndex]);
        if (itemIndex === -1) {
            return res.json({ message: 'Item not found' });
        }
        res.json(items[itemIndex]);
    } catch {
        res.send("Internal Server Error!")
    }
});
//================================ Route for put =============================== //
app.put('/api/users/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        // console.log(id);
        const items = read(dirName);
        const itemIndex = items.findIndex((data) => data.id === id);
        // console.log(itemIndex);
        // console.log(items);
        if (!req.body.id || !req.body.name || !req.body.city) {
            return res.json({ message: 'All Feilds required!' })
        }
        if (itemIndex === -1) {
            return res.json({ message: 'item not Found' });
        }
        items[itemIndex].name = req.body.name;
        items[itemIndex].city = req.body.city;
        // console.log(items[itemIndex]);
        write(items);
        res.json({message: "Updated Successesfully!"});
    } catch {
        res.json({ message: 'Internal server failed!' })
    }
});

// ======================== Route to delete ======================== // 
app.delete('/api/users/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        console.log(id);
        const items = read(dirName);
        const itemIndex = items.findIndex((data) => data.id === id);
        if (itemIndex === -1) {
            return res.json({ message: 'Items not found' });
        }
        const deletedItem = items.splice(itemIndex, 1);
        write(items);
        res.json({ message: 'Items deleted successfully', item: deletedItem });
    } catch {
        res.send("Internal server error!");
    }
});

// ======================== Start the server ===================== //
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
