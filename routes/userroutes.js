const router = require("express").Router();
const {
    getUserData,
    getUserById,
    postUserData,
    updateUserData,
    deleteUserData
} = require("../controllers/users.controllers");

// ===========  API to get user data =========== //
router.get("/", getUserData);

// =========== API to get user data of specified id ========== //
router.get("/:id", getUserById);

// =========== API to post user data ========== //
router.post("/", postUserData);

// =========== API to update user data of specified id ========== //
router.put("/:id", updateUserData);

// =========== API to delete user data of specified id ========== //
router.delete("/:id", deleteUserData);

// =============== Middleware for any invalid route =============== //
router.use((req, res) => {
    res.status(404).json({ message: "Route was not Found"})
})

// =========== Exporting the router ========== //
module.exports = router;
