import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faMoneyBill, faHashtag, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MDBCard, MDBCardBody, MDBContainer, MDBCardText, MDBTypography, MDBCol,MDBRow, MDBBadge, MDBBtn, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './ServiceUpdation.css';
import {toast} from 'react-toastify';
import {useNavigate ,useLocation} from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function ServiceUpdation() {

    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;
    const [cookies] = useCookies(['accessToken']);

    const [isOpen, setisOpen] = React.useState(false);
    const [title, setTitle] = React.useState(data.title);
    const [description, setDescription] = React.useState(data.description);
    const [price, setPrice] = React.useState(data.price);
    const [tags, setTags] = React.useState(data.tags);
    const [newTag, setNewTag] = React.useState('');

    

    const handleupdation = async() => {
            
            if(title === '' || description === '' || price === '' || tags === ''){
            toast.error('Please fill all the fields');
            return;
            }

            const body = {
            title: title,
            description: description,
            price: price,
            tags: tags
            };
        
            const response = await fetch('/service/updateservice', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookies.accessToken}`,
            },
            body: JSON.stringify(body)
            });
        
            const data = await response.json();
        
            if(data.error){
            toast.error(data.error);
            return;
            }
        
            toast.success(data.message);
    
            const delay = (ms) => {
            return new Promise((resolve) => setTimeout(resolve, ms));
            };
    
            await delay(2000);
            navigate('/service/serviceprofile');


           
            
    }

    const addTag = () => {
        if (newTag.trim() !== '') {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addTag();
        }
    };

    

    const removeTag = (index) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1);
        setTags(updatedTags);
    };




    const handledeletion = async() => {

        setisOpen(false);
      
        try {
          const response = await fetch(`/service/deleteservice`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${cookies.accessToken}`,
            },
          });
      
          if (response.ok) {
            const data = await response.json();
            toast.success(data.message);
            navigate('/service/createservice');
          } else {
            throw new Error('Failed to delete service');
          }
        } catch (error) {
          toast.error(error.message);
          navigate('/service/serviceprofile');
        }
      };


    return(
        <div>
            <section className="vh-100" style={{ backgroundColor: '#eee' }}>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol xl="10">
                        <MDBCard className="mb-5" style={{ borderRadius: '15px' }}>
                        <MDBCardBody className="p-4">
                            <MDBTypography className='text-center my-4' tag='h3'><input value={title} onChange={(e)=>setTitle(e.target.value)}></input></MDBTypography>
                            <MDBCardText className="medium">
                            <MDBRow className='my-4'>
                                <MDBCol md='1' className="d-flex align-items-center justify-content-center">
                                    <FontAwesomeIcon icon={faClipboard} className="fa-xl" />
                                </MDBCol>
                                <MDBCol md='9'>
                                <textarea value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className='my-4'>
                                <MDBCol md='1' className="d-flex align-items-center justify-content-center">
                                    <FontAwesomeIcon icon={faMoneyBill} className="fa-xl" />
                                </MDBCol>
                                <MDBCol md='9'>
                                    <input type='number' value={price} onChange={(e)=>setPrice(e.target.value)}></input>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className='my-4'>
                                    <MDBCol md='1' className="d-flex align-items-center justify-content-center">
                                        <FontAwesomeIcon icon={faHashtag} className="fa-xl" />
                                    </MDBCol>
                                    <MDBCol md='9'>
                                        {tags.map((tag, index) => (
                                            <MDBBadge id='badge-large' color='dark' className='ms-2' key={index}>
                                                {tag}
                                                <MDBIcon icon='times' className='ms-1' onClick={() => removeTag(index)} />
                                            </MDBBadge>
                                        ))}
                                        <MDBRow className='my-4'>
                                            <MDBCol md='1' className="d-flex align-items-center justify-content-center">
                                                <FontAwesomeIcon icon={faPlus} className="fa-xl" onClick={addTag} style={{ cursor: 'pointer' }} />
                                            </MDBCol>
                                            <MDBCol md='9'>
                                                <MDBInput
                                                    label="Add Tag"
                                                    value={newTag}
                                                    onChange={(e) => setNewTag(e.target.value)}
                                                    onKeyPress={handleKeyPress}
                                                />
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCol>
                                </MDBRow><br></br>
                            <MDBRow className='my-4'>
                                <MDBCol md='2' className="d-flex align-items-center justify-content-center">
                                    
                                </MDBCol>
                                <MDBCol md='8'>
                                    <MDBBtn id='btnfont' color='dark' className='w-100 mb-4' onClick={handleupdation}>Save Changes</MDBBtn>
                                    <MDBBtn outline id='btnfont' color='danger' className='w-100 mb-4' onClick={() => setisOpen(true)}>Delete Service</MDBBtn>
                                </MDBCol>
                            </MDBRow>

                            </MDBCardText>
                        </MDBCardBody>
                        </MDBCard>    
                    </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            { <div className={`confirmation-alert ${isOpen ? 'open' : ''}`}>
                <div className="confirmation-alert-overlay"></div>
                <div className="confirmation-alert-content">
                    <div className="confirmation-alert-header">
                    <FontAwesomeIcon icon={faCheckCircle} className="confirmation-alert-icon" />
                    <h2 className="confirmation-alert-title">Confirmation</h2>
                    </div>
                    <div className="confirmation-alert-body">
                    <p>Do you want to proceed with deleting this service?</p>
                    </div>
                    <div className="confirmation-alert-footer">
                    <button className="confirmation-alert-button confirmation-alert-confirm" onClick={handledeletion}>
                        Yes
                    </button>
                    <button className="confirmation-alert-button confirmation-alert-cancel" onClick={() => setisOpen(false)}>
                        No
                    </button>
                    </div>
                </div>
                </div>
                }

        </div>

        
    );
}