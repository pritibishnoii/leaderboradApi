const express = require('express');
const router = express.Router();
const {
  getUsers, createUser, claimPoints, getLeaderboard
} = require('../controllers/userController');


router.route("/").get(getUsers).post(createUser)
router.route("/claim").post( claimPoints);
router.route('/leaderboard').get(getLeaderboard);

module.exports = router;
