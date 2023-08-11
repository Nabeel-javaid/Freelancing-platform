import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faMoneyBill, faHashtag, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { MDBCard, MDBCardBody, MDBContainer, MDBCardText, MDBTypography, MDBCol,MDBRow, MDBBadge, MDBBtn } from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './ServiceProfile.css';
import {toast} from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function ServiceUpdation() {

    const [isOpen, setisOpen] = React.useState(false);
    const [servicedata, setServiceData] = React.useState(null);
    const [cookies] = useCookies(['accessToken']);

    const navigate = useNavigate();

    const handledeletion = async () => {
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
            navigate('/service/myservice');
          } else {
            throw new Error('Failed to delete service');
          }
        } catch (error) {
          toast.error(error.message);
        }
      };

    React.useEffect(() => {
        (async () => {
          try {
            const response = await fetch(`/service/getservice`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookies.accessToken}`,
              },
            });
      
            if (response.ok) {
              const data = await response.json();
              setServiceData(data);
            } else {
              throw new Error('Failed to fetch service data');
            }
          } catch (error) {
            toast.error(error.message);
          }
        })();
      }, [ cookies.accessToken]);



    return(
        <div>
            {servicedata ? (
                <section className="vh-100" style={{ backgroundColor: '#eee' }}>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol xl="10">
                        <MDBCard className="mb-5" style={{ borderRadius: '15px' }}>
                        <MDBCardBody className="p-4">
                            <MDBTypography className='text-center my-4' tag='h3'>{servicedata.title}</MDBTypography>
                            <MDBCardText className="medium">
                            <MDBRow className='my-4'>
                                <MDBCol md='1' className="d-flex align-items-center justify-content-center">
                                    <FontAwesomeIcon icon={faClipboard} className="fa-xl" />
                                </MDBCol>
                                <MDBCol md='9'>
                                {servicedata.description}
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className='my-4'>
                                <MDBCol md='1' className="d-flex align-items-center justify-content-center">
                                    <FontAwesomeIcon icon={faMoneyBill} className="fa-xl" />
                                </MDBCol>
                                <MDBCol md='9'>
                                {servicedata.price}
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className='my-4'>
                                <MDBCol md='1' className="d-flex align-items-center justify-content-center">
                                    <FontAwesomeIcon icon={faHashtag} className="fa-xl" />
                                </MDBCol>
                                <MDBCol md='9'>
                                    {servicedata.tags.map((tag) => {
                                        return(
                                            <MDBBadge id='badge-large' color='dark' className='ms-2'>{tag}</MDBBadge>
                                        )
                                    })}
                    
                                </MDBCol>
                            </MDBRow><br></br>
                            <MDBRow className='my-4'>
                                <MDBCol md='2' className="d-flex align-items-center justify-content-center">
                                    
                                </MDBCol>
                                <MDBCol md='8'>
                                    <Link to={'/service/serviceprofileupdation'} state = {{title : servicedata.title, description: servicedata.description, price: servicedata.price, tags: servicedata.tags}}>
                                    <MDBBtn id='btnfont' color='dark' className='w-100 mb-4'>Update Service</MDBBtn>
                                    </Link>
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
            ) : (
                <div>
                    <br /><br /><br /><br />
                <div>Loading...</div>
                </div>
            )}
            

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