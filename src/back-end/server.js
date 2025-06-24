import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Simple spam detection logic
const isSpam = (account) => {
  const { username, bio, followers, following, posts } = account;

  // Rule 1: Profile has no bio
  if (!bio || bio.trim() === '') {
    return true;
  }

  // Rule 2: High following to follower ratio
  if (followers > 0 && following / followers > 10) {
    return true;
  }

  // Rule 3: Low number of posts but high following
  if (posts < 5 && following > 100) {
    return true;
  }

  // Rule 4: Username contains suspicious keywords
  const spamKeywords = ['free', 'followers', 'buy', 'win'];
  if (spamKeywords.some(keyword => username.toLowerCase().includes(keyword))) {
    return true;
  }

  return false;
};

app.post('/check-spam', (req, res) => {
  const account = req.body;

  if (!account || !account.username) {
    return res.status(400).json({ error: 'Invalid account data provided.' });
  }

  const spam = isSpam(account);

  res.json({ isSpam: spam });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
