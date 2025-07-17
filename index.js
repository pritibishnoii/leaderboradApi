const express = require('express');
const cors = require('cors');
const connectDB = require("./config/index")

const userRoutes = require('./routes/userRoutes');
const historyRoutes = require('./routes/historyRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/history', historyRoutes);
// Connect to database first
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT} 🎉`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

