import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoute from './routes/user.js';
import authRoute from './routes/auth.js';
import productRoute from './routes/product.js';
import cartRoute from './routes/cart.js';
import orderRoute from './routes/order.js';
import stripeRoute from './routes/stripe.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: true,
  credentials: true
}

//database connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB database connected');
  } catch (err) {
    console.log('MongoDB database connection failed', err);
  }
};


// Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Rutas
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);

// Error handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  connect();
  console.log('server listening on port', port);
});