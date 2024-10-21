const express = require('express');
const router = express.Router();
const adminCont = require('../controllers/adminCont');
const {checkAdmin} = require('../middlewares/authMiddleware');


router.get('/dashboard',checkAdmin, adminCont.dashboard);

router.get('/sign-in', adminCont.get_login);
router.post('/sign-in', adminCont.login);
router.post('/sign-up', adminCont.register_admin);
router.get('/logout', adminCont.admin_logout);

router.get('/register', checkAdmin, adminCont.get_register);
router.post('/register', checkAdmin, adminCont.registeration);

router.get('/parents', checkAdmin, adminCont.get_parents);
router.get('/students', checkAdmin, adminCont.get_students);

router.get('/memos', checkAdmin, adminCont.get_memos);
router.get('/memo', checkAdmin, adminCont.get_memoForm);
router.post('/post-memo', checkAdmin, adminCont.post_memoForm);
router.get('/memo-edit', checkAdmin, adminCont.view_edit_memo);

module.exports = router;