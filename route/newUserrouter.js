const router = require('express').Router();
const {
    register,
    Login
}=require("../Controller/newUser");


router.post('/register', register);
router.post('/login', Login);


module.exports = router;