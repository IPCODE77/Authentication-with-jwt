
const express = require("express");
const {handelUserCreation,handelUserLogin,checkAuth,logoutUser} = require("../controller/user");
const router = express.Router();


router.post('/saveuser',handelUserCreation);
router.post('/loginUser',handelUserLogin);
router.get('/check-auth',checkAuth);
router.post('/logout',logoutUser);

module.exports = router;