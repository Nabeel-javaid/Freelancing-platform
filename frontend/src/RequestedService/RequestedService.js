import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faMoneyBill, faCircleInfo, faReply } from '@fortawesome/free-solid-svg-icons';
import { MDBCard, MDBCardBody, MDBContainer, MDBCardText, MDBCol, MDBRow, MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalTitle, MDBModalHeader } from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';

export default function RequestedService() {
  const [cookies] = useCookies(['accessToken']);

  const [serviceorderdata, setServiceOrderData] = React.useState(null);
  const [serviceid, setserviceid] = React.useState("");
  const [serviceresponse, setResponse] = React.useState("");

  const [showModal, setShowModal] = React.useState(false); // State for modal visibility

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/service/getsellerserviceorders`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setServiceOrderData(data);
        } else {
          throw new Error('Failed to fetch service data');
        }
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, [cookies.accessToken]);



  const handleServiceAction = async (newstatus, newserviceid) => {
    try {
      const response = await fetch(`/service/manageserviceorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.accessToken}`,
        },
        body: JSON.stringify({
          serviceid: newserviceid,
            status: newstatus,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to change service status');
      }
  
      toast.success(`Service ${newstatus} successfully`);

      const delay = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
        };

        await delay(2000);

      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };
  
    const completeRequest = async (newstatus) => {

        try {
            const response = await fetch(`/service/completeserviceorder`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookies.accessToken}`,
              },
              body: JSON.stringify({
                serviceid: serviceid,
                status: newstatus,
                response: serviceresponse,
              }),
            });
        
            if (!response.ok) {
              throw new Error('Failed to change service status');
            }
        
            toast.success(`Service ${newstatus} successfully`);

            const delay = (ms) => {
                return new Promise((resolve) => setTimeout(resolve, ms));
                };
        
                await delay(2000);
            
            window.location.reload();
          } catch (error) {
            toast.error(error.message);
          }
    };


  return (
    <div>
      {serviceorderdata ? (
        <section className="vh-100" style={{ backgroundColor: '#eee' }}>
          <MDBContainer className="py-5 h-100">
            {serviceorderdata.map((order) => (
              <MDBRow className="justify-content-center align-items-center h-100" key={order.id}>
                <MDBCol xl="10">
                  <MDBCard className="mb-5" style={{ borderRadius: '15px' }}>
                    <MDBCardBody className="p-4">
                      <MDBCardText className="medium">
                        <MDBRow className="my-4">
                          <MDBCol md="1" className="d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faClipboard} className="fa-xl" />
                          </MDBCol>
                          <MDBCol md="9">{order.description}</MDBCol>
                        </MDBRow>
                        <MDBRow className="my-4">
                          <MDBCol md="1" className="d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faMoneyBill} className="fa-xl" />
                          </MDBCol>
                          <MDBCol md="9">{order.price}</MDBCol>
                        </MDBRow>
                        <MDBRow className="my-4">
                          <MDBCol md="1" className="d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faCircleInfo} className="fa-xl" />
                          </MDBCol>
                          <MDBCol md="9">{order.status}</MDBCol>
                        </MDBRow>

                        {order.status === 'Pending' && (
                          <>
                            <br />
                            <br />
                            <MDBRow className="my-4">
                              <MDBCol md="2" className="d-flex align-items-center justify-content-center"></MDBCol>
                              <MDBCol md="8">
                                <MDBBtn id="btnfont" color="dark" className="w-100 mb-4" onClick={() => {
                                    handleServiceAction("Accepted", order._id);
                                }}>
                                  Accept Service
                                </MDBBtn>

                                <MDBBtn outline id="btnfont" color="dark" className="w-100 mb-4" onClick={() => {
                                  handleServiceAction("Rejected", order._id);
                                }}>
                                  Reject Service
                                </MDBBtn>
                              </MDBCol>
                            </MDBRow>
                          </>
                        )}

                        {order.status === 'Accepted' && (
                          <>
                            <br />
                            <br />
                            <MDBRow className="my-4">
                              <MDBCol md="2" className="d-flex align-items-center justify-content-center"></MDBCol>
                              <MDBCol md="8">
                                <MDBBtn id="btnfont" color="dark" className="w-100 mb-4"  onClick={() => {
                                  setserviceid(order._id);
                                  setShowModal(true);
                                }} >
                                  Complete Request
                                </MDBBtn>
                              </MDBCol>
                            </MDBRow>
                          </>
                        )}

                        {order.status === 'Completed' && (
                            <div>
                            <MDBRow className="my-4">
                            <MDBCol md="1" className="d-flex align-items-center justify-content-center">
                              <FontAwesomeIcon icon={faReply} className="fa-xl" />
                            </MDBCol>
                            <MDBCol md="9">{order.response}</MDBCol>
                          </MDBRow>
                          <br/>
                          </div>
                          
                        )}
                        

                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            ))}
          </MDBContainer>
        </section>
      ) : (
        <div>
          <br />
          <br />
          <br />
          <br />
          <div>Loading...</div>
        </div>
      )}

        {/* Modal */}
      {/* <MDBBtn onClick={() => setShowModal(true)}>Hire Service</MDBBtn> */}
      <MDBModal show={showModal} setShow={setShowModal} tabIndex="-1">
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Complete Service Request</MDBModalTitle>
                  <MDBBtn className="btn-close" color="none" onClick={() => setShowModal(false)}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <div className="mb-3">
                    <label htmlFor="serviceDescription" className="form-label">
                      Give your response to buyer , you may share links/repositories of your work
                    </label>
                    <textarea
                      className="form-control"
                      id="serviceDescription"
                      rows={5}
                      value={serviceresponse}
                      onChange={(e) => setResponse(e.target.value)}
                    />
                  </div>
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={() => setShowModal(false)}>
                    Close
                  </MDBBtn>
                  <MDBBtn color="dark" onClick={()=>{
                    
                    completeRequest("Completed")
                    }}>
                    Complete Request
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>


    </div>
  );
}
