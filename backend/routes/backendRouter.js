import express from 'express';
import { createService, updateService, deleteService, getService, findService, checkservice } from '../controller/serviceController.js';
import { createServiceOrder, getServiceOrders, getSellerServiceOrders, manageServiceOrder, completeServiceOrder, intent } from '../controller/serviceOrderController.js';
import { login, register } from '../controller/authController.js';
// import { createadmin,sendnotification,getnotifications,adminlogin, getusers, getsearchservices, getsearchusers}  from  '../controller/adminController.js'
import { verifyToken } from '../middleware/jwt.js';
import { reviews, updatereview, deletereview, getreview } from '../controller/reviewController.js'
import { deleteUser, updateuser, getUser } from '../controller/userController.js'
import jwt from 'jsonwebtoken';

function authenticateAdmin(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, proces.env.JWT_KEY);
    if (decoded.username !== 'Admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden' });
  }
}



const backendRouter = express.Router();

backendRouter.post('/userlogin', login);

backendRouter.post('/createservice', verifyToken, createService);
backendRouter.put('/updateservice', verifyToken, updateService);
backendRouter.delete('/deleteservice', verifyToken, deleteService);
backendRouter.get('/getservice', verifyToken, getService);
backendRouter.post('/findservice', verifyToken, findService)
backendRouter.get('/checkservice', verifyToken, checkservice)

backendRouter.post('/createserviceorder', verifyToken, createServiceOrder);
backendRouter.put('/manageserviceorder', verifyToken, manageServiceOrder);
backendRouter.put('/completeserviceorder', verifyToken, completeServiceOrder);
backendRouter.get('/getsellerserviceorders', verifyToken, getSellerServiceOrders);
backendRouter.get('/getserviceorders', verifyToken, getServiceOrders);
backendRouter.post('/create-payment-intent/:id', verifyToken, intent);


backendRouter.post('/uploadreview', verifyToken, reviews);
backendRouter.put('/updatereview', verifyToken, updatereview);
backendRouter.delete('/deletereview', verifyToken, deletereview);
backendRouter.get('/getreview', verifyToken, getreview);

backendRouter.post('/register', register);
backendRouter.put('/updateuser', verifyToken, updateuser);
backendRouter.get('/getuser', verifyToken, getUser);

// backendRouter.post('/createadmin', createadmin);
// backendRouter.post('/adminlogin', adminlogin);
// backendRouter.post('/sendnotification', sendnotification);
// backendRouter.get('/getnotifications', getnotifications);
// backendRouter.get('/authenticateadmin', authenticateAdmin);
// backendRouter.get('/viewusers',  getusers);
// backendRouter.get('/searchservices',  getsearchservices);
// backendRouter.get('/searchusers/:name',  getsearchusers);




export default backendRouter;