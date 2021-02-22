import express from 'express';

const app = express();

app.get('/', (req, res) => {
  return res.json({rockeaseat: 'Hello World NLW 4' });
})

app.listen(3000, () => console.log('Server is running!!'));
