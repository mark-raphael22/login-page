const router = require('express').Router();
const {
    register,
    Login,
    getregisteredpage,
    getloginpage,
    getdashboard
}=require("../Controller/newUser");


router.post('/register', register);
router.post('/login', Login);
router.get('/register', getregisteredpage);
router.get('/Login', getloginpage);
router.get('/dashboard', getdashboard);

module.exports = router;