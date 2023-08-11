import ServiceOrder from '../model/serviceOrderModel.js'
import Stripe from 'stripe';
import Service from '../model/serviceModel.js';

 const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);

  const service = await ServiceOrder.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: service.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
 
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
};


const createServiceOrder = async (req,res)=>{
    const {serviceid,sellerid,price,description,response,status} = req.body.body;
    const buyerid = req.userid;
    const serviceOrder = new ServiceOrder({
        serviceid,
        buyerid,
        sellerid,
        price,
        description,
        response,
        status
    })
    try{
        await serviceOrder.save();
        res.json({ message: "Service order created successfully!", serviceOrderId: serviceOrder._id });

    }catch(err){
        res.json({error:err});
    }
}



  const getServiceOrders = async (req, res) => {
    const userid = req.userid;
    try {
      
      const serviceOrders = await ServiceOrder.find({ buyerid: userid });
  
      res.json(serviceOrders);
    } catch (err) {
      res.json({ error: err });
    }
  };

  const getSellerServiceOrders = async (req, res) => {
    const userid = req.userid;
    try {

      const serviceOrders = await ServiceOrder.find({ sellerid: userid });

      res.json(serviceOrders);
    } catch (err) {
      res.json({ error: err });
    }
  };

  const manageServiceOrder = async (req, res) => {
    const { serviceid, status } = req.body;

    try {

      await ServiceOrder.updateOne(
        { _id: serviceid },
        { $set: { status: status } } 
      );

      res.json({ message: 'Service order updated successfully' });
    } catch (err) {
      res.json({ error: err });
    }
  };
  
  const completeServiceOrder = async (req, res) => {

    const { serviceid, status, response } = req.body;

    console.log(serviceid, status, response);

    try {

      await ServiceOrder.updateOne(
        { _id: serviceid },
        { $set: { status: status, response: response } }
      );
      

      res.json({ message: 'Service order completed successfully' });

    } catch (err) {
      res.json({ error: err });
    }
  };


export {createServiceOrder,getServiceOrders, getSellerServiceOrders, manageServiceOrder, completeServiceOrder, intent}