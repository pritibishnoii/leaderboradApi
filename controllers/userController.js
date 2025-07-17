const User = require('../models/User');
const History = require('../models/History');

exports.getUsers = async (req, res) => {
  const users = await User.find();
  const  userCount = users.length
  res.json({
    userCount,
    users,
  });
};

exports.createUser = async (req, res) => {

  const { name } = req.body;
  // Check if user with the same name exists
  const userExist = await User.findOne({ name });
  if (userExist) {
    return res.status(409).json({
      message: `${ userExist.name} already present`,
     
    });
  }

  const user = new User({ name });
  await user.save();
  res.status(201).json(user);
};

exports.claimPoints = async (req, res) => {
  const { userId } = req.body;
  const points = Math.floor(Math.random() * 10) + 1;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.totalPoints += points;
  await user.save();

//   save the info inside history db 
  const history = new History({ userId, points });
  await history.save();

  res.json({ user, points });
};

exports.getLeaderboard = async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  const leaderboard = users.map((user, index) => ({
    name: user.name,
    totalPoints: user.totalPoints,
    rank: index + 1
  }));
  res.json(leaderboard);
};
