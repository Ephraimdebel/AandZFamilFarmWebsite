// Import the express module 
const express = require('express');
// Call the router method from express to create the router 
const router = express.Router();
// Import the install router 
const installRouter = require('./install.routes');
// Import the auth router
const authRouter = require('./auth.routes');
// Import the gallery route
const galleryRouter = require('./gallery.routes');
// Import the testimonial route
const testimonialRouter = require('./testimonial.routes');
// Import the service route
const serviceRouter = require('./service.routes');
// Import the category route
const categoryRouter = require('./category.routes');
// Import the category route
const priceRouter = require('./price.routes');
// Import the category route
const orderRouter = require('./order.routes');
// Import the user route
const userRoutes = require('./user.routes');

// Add the install router to the main router 
router.use(installRouter);
// add auth router to the main router
router.use('/api/auth', authRouter); 
//add the gallery route to the main router
router.use('/api', galleryRouter);
// add the testimonial route to the main route
router.use('/api', testimonialRouter);
// add the service route into the main route
router.use('/api', serviceRouter);
// add the category route into the main route
router.use('/api', categoryRouter);
// add the price route into the main route
router.use('/api', priceRouter);
// add the order route in to the main route
router.use('/api', orderRouter);
// add the order user route in to the main route
router.use('/api', userRoutes);

module.exports = router; 