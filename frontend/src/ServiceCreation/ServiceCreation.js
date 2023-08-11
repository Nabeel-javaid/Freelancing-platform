import {React, useState} from 'react';
import {
  MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBInput
}
from 'mdb-react-ui-kit';
import './ServiceCreation.css'
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


function ServiceCreation() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState('');
  const [cookies] = useCookies(['accessToken']);

  const navigate = useNavigate();
  


  const handlecreation = async() => {
      
      if(title === '' || description === '' || price === '' || tags === ''){
        toast.error('Please fill all the fields');
        return;
      }
  
      const tagsArray = tags.split(',');
  
      const body = {
        title: title,
        description: description,
        price: price,
        tags: tagsArray
      };
      

      const response = await fetch('/service/createservice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.accessToken}`
        },
        body: JSON.stringify(body)
      });
  
      const data = await response.json();
  
      if(data.error){
        toast.error(data.error);

        navigate('/service/serviceprofile');
      }
      else
      {
        toast.success(data.message);
        navigate('/service/serviceprofile');
      }
 
  
      
  
  };

  return (
    <div>
      <MDBContainer fluid className='p-4'>

      <MDBRow>

        <MDBCol md='5' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            The best offer <br />
            <span className="text-primary">for your business</span>
          </h1>

          <p className='px-3 ' style={{color: 'hsl(217, 10%, 50.8%)'}}>
          Are you passionate about sharing your skills and expertise with others? It's time to turn your knowledge into a valuable service! By creating your own service on this platform, you open the doors to a world of opportunities.

          <br></br><br></br>Not only can you showcase your unique offerings to a wide audience, but you also have the chance to make a positive impact on people's lives. Whether you're a talented designer, a skilled writer, a knowledgeable consultant, or an experienced coach, creating a service allows you to connect with those who can benefit from your expertise.

          <br></br><br></br>It's a win-win situation where you can pursue your passion, earn income, and contribute to the growth and development of others. So, take that leap of faith, unleash your potential, and embark on an exciting journey of creating a service that will make a difference!
          </p>

        </MDBCol>

        <MDBCol size="6">
          <br></br><br></br><br></br><br></br><br></br>
          <MDBCard className='my-5'>
            <MDBCardBody className='p-5'>

              <MDBInput wrapperClass='mb-4' label='Title' id='form1' type='text' value={title} onChange={(e) => setTitle(e.target.value) }/>

              <MDBInput  textarea rows={4} wrapperClass='mb-4' label='Description' id='form1' type='textarea' value={description} onChange={(e) => setDescription(e.target.value) }/>

              <MDBInput wrapperClass='mb-4' label='Price' id='form1' type='number' value={price} onChange={(e) => setPrice(e.target.value) }/>

              <MDBInput wrapperClass='mb-4' label='Tags (Comma Separated)' id='form1' type='text' value={tags} onChange={(e) => setTags(e.target.value) }/>

              <MDBBtn id='btnfont' color='dark' className='w-100 mb-4' onClick={handlecreation}>Register Your Service !</MDBBtn>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

      </MDBContainer>
</div>

  );
}

export default ServiceCreation;
