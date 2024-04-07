import express from 'express';
import connectDB from './database/db.js';
const app = express();

connectDB(app);
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
