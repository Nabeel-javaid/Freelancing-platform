import Service from '../model/serviceModel.js';

const createService = async (req,res)=>{
  try{

    const {title,description,price,tags} = req.body;
    const userid = req.userid;

    const existingService = await Service.findOne({ userid: userid });
    if (existingService) {
      res.status(400).json({ error: "User already has a service created" });
      return;
    }
  
    const service = new Service({
        userid : userid,
        title,
        description,
        price,
        tags
    })
    
        await service.save();
        res.json({message:"Service created successfully!"});
    }catch(err){
        res.json({error:err});
    }
}

const checkservice = async (req,res)=>{
  try{
    const userid = req.userid;
    const existingService = await Service.findOne({ userid: userid });
    if (existingService) {
      res.status(200).json({ message: 'User has a service' });
      return;
    } 
    else {
      res.status(335).json({ message: 'User does not have a service' });
    }
  }catch(err){
    res.json({error:err});
  }
}


const updateService = async (req, res) => {
    const userid = req.userid;
    const { title, description, price, tags } = req.body;
  
    try {
      const updatedService = await Service.findOneAndUpdate(
        { userid: userid },
        { title, description, price, tags },
        { new: true }
      );
  
      if (updatedService) {
        res.json({ message: 'Service Updated successfully' });
      } else {
        res.status(404).json({ error: 'Service not found' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to update service' });
    }
  };


  const deleteService = async (req, res) => {
    const userid = req.userid;
  
    try {
      const deletedService = await Service.findOneAndDelete({ userid: userid });
  
      if (deletedService) {
        res.json({ message: 'Service deleted successfully' });
      } else {
        res.status(404).json({ error: 'Service not found' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to delete service' });
    }
  };


  const getService = async (req, res) => {
    const userid = req.userid;
  
    try {
      const service = await Service.findOne({userid:userid});
  
      if (service) {
        res.json(service);
      } else {
        res.status(404).json({ error: 'Service not found' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to retrieve service' });
    }
  };

  const findService = async (req, res) => {

    try {
      const {input, filters } = req.body;
      const userid = req.userid;
  
      if (filters.every((filter) => !filter)) {
        return res.status(310).json({ message: 'No search criteria was selected' });
      }
  
      let query = {};
  
      if (filters.includes('title')) {
        query.title = { $regex: input, $options: 'i' };
      }
  
      if (filters.includes('description')) {
        query.description = { $regex: input, $options: 'i' };
      }
  
      if (filters.includes('price')) {
        query.price = isNaN(input) ? null : parseInt(input);
      }
  
      if (filters.includes('tags')) {
        const tags = input.split(/[, ]+/).filter(Boolean);
        query.tags = { $in: tags };
      }

      query.userid = { $ne: userid };
  
      const searchResults = await Service.find(query);
  
      res.json(searchResults);
    } catch (error) {
      console.error('Error occurred during search:', error);
      res.status(500).json({ error: 'An error occurred during search' });
    }

  };
  
export {createService,updateService,deleteService,getService,findService,checkservice}
  
  