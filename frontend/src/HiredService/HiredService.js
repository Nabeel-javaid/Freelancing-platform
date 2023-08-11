import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faMoneyBill, faCircleInfo, faReply } from '@fortawesome/free-solid-svg-icons';
import { MDBCard, MDBCardBody, MDBContainer, MDBCardText, MDBCol, MDBRow, MDBBtn } from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function HiredService() {
  const [cookies] = useCookies(['accessToken']);
  const [serviceorderdata, setServiceOrderData] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/service/getserviceorders`, {
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

  return (
    <div>
        <br/><br/>
      {serviceorderdata ? (
        <div>
          <section className="vh-100" style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-5">
              <MDBRow className="justify-content-center">
                {serviceorderdata.map((order) => (
                  <MDBCol xl="4" md="6" key={order.id} className="mb-4">
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
                          {order.status === 'Completed' && (
                            <div>
                              <MDBRow className="my-4">
                                <MDBCol md="1" className="d-flex align-items-center justify-content-center">
                                  <FontAwesomeIcon icon={faReply} className="fa-xl" />
                                </MDBCol>
                                <MDBCol md="9">{order.response}</MDBCol>
                              </MDBRow>
                              <br/><br/>
                              <MDBRow className="my-4">
                                <MDBCol md="2" className="d-flex align-items-center justify-content-center"></MDBCol>
                                <MDBCol md="8">
                                    <Link to="/feedbackform">
                                    <MDBBtn id="btnfont" color="dark" className="w-100 mb-4">
                                      Review Service
                                    </MDBBtn>
                                  </Link>
                                </MDBCol>
                              </MDBRow>
                            </div>
                          )}
                        </MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                ))}
              </MDBRow>
            </MDBContainer>
          </section>
        </div>
      ) : (
        <div>
          <br />
          <br />
          <br />
          <br />
          <div>Loading...</div>
        </div>
      )}
    </div>
  );
}
