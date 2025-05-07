const express = require('express');
const app = express();
const cors = require('cors');
const apiRouter = express.Router();

app.use(express.json());

const corsPolicy = {
    origin: 'http://localhost:5173',                    // kun requests fra frontenden.
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsPolicy));

app.use('/api', apiRouter);


const movieRoutes = require('./routes/movies');
apiRouter.use('/movies', movieRoutes);

const userRoutes = require('./routes/users');
apiRouter.use('/users', userRoutes);



app.get('/', (req, res) => {
  res.send('API online');
});
app.get('/status',(req, res) => {
    res.json({'status':'response from the api, status: online'})
})

// start serveren
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});
