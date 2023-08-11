import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  Description: {
    type: String,
    required: true
    
  },
  
});

const Notification = mongoose.model('Notification', NotificationSchema);

export default Notification;