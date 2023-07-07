require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();

const userRoutes = require('./routes/user-routes');
const driverRoutes = require('./routes/driver-routes');
const bookingRoutes = require('./routes/booking-routes');

app.use(cors());
app.use(express.json())

app.use('/api/users', userRoutes);

app.use('/api/drivers', driverRoutes);

app.use('/api/bookings', bookingRoutes);




mongoose.connect('mongodb://127.0.0.1:27017/driverbooking')
    .then(() => { console.log("DB CONNECTED") })
    .catch(err => { console.log(err) })

const PORT = process.env.PORT || 4000

app.use(express.json());
app.use(cors());



app.listen(PORT, () => console.log(`${PORT}`))