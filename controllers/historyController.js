const History = require('../models/History');

exports.getHistory = async (req, res) => {
  const history = await History.find().populate('userId').sort({ createdAt: -1 });
  res.json(history);
};
