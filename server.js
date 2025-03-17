const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Google Apps Script URL (from Step 1 above)
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyRNWXvY0ol7tNy6ZGx7XNIm8xTmn9oV9zzh0W_mdWItA5LY6s-AaSoFj6yaITKo1h5/exec';

app.use(express.static('public'));

app.get('/api/deals', async (req, res) => {
  try {
    const response = await axios.get(APPS_SCRIPT_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});