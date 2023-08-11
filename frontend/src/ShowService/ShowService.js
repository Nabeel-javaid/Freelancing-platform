import React, { useState } from 'react';
import { MDBInput, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBModalContent, MDBModalDialog, MDBModalTitle } from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTags } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { MDBCard, MDBCardBody, MDBContainer, MDBCardText, MDBTypography, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { faClipboard, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import {useNavigate} from 'react-router-dom';

export default function ShowService() {
  const [cookies] = useCookies(['accessToken']);
  const navigate = useNavigate();

  const [selectedFilters, setSelectedFilters] = useState({
    title: false,
    description: false,
    price: false,
    tags: false,
  });
  const [result, setresult] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [serviceDescription, setServiceDescription] = useState('');

  const [serviceID, setserviceID] = useState('');
  const [sellerid, setsellerid] = useState('');
  const [price, setPrice] = useState('');

  const toggleFilter = (filter) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };

  const setVariables = (serviceid, sellerid, price) => {
    setserviceID(serviceid);
    setsellerid(sellerid);
    setPrice(price);
  };

  const handleSearch = async () => {
    try {
      const searchInput = document.getElementById('search-input').value;
      const filters = Object.keys(selectedFilters).filter((key) => selectedFilters[key]);
      console.log(filters);
      const query = {
        input: searchInput,
        filters: filters,
      };

      const response = await fetch('/service/findservice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.accessToken}`,
        },
        body: JSON.stringify(query),
      });

      if (!response.ok) {
        throw new Error('Search request failed');
      }

      const searchResults = await response.json();
      setresult(searchResults);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const createOrder = async () => {
    console.log(serviceID);
    const body = {
      serviceid: serviceID,
      sellerid: sellerid,
      price: price,
      description: serviceDescription, 
      response: '',
      status: 'Pending',
    };

    try {
      const response = await fetch('/service/createserviceorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.accessToken}`,
        },
        body: JSON.stringify({ body }),
      });

      if (response.status === 200) {
        const data = await response.json();
        toast.success(data.message);
        setShowModal(false); 
        navigate(`/pay/${data.serviceOrderId}`);
      } else {
        const data = await response.json();
        toast.error(data.message);
        setShowModal(false); 
        navigate('/service/showservice');

      }
    } catch (error) {
      console.log('Error occurred while creating service order:', error);
    }
  };

  return (
    <div>
      <div className="d-flex flex-column align-items-center">
        <br />
        <br />
        <br />
        <div className="d-flex justify-content-center align-items-center mb-4">
          <MDBInput id="search-input" type="text" outline placeholder="Search..." className="me-2" />
          <MDBBtn color="dark" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </MDBBtn>
        </div>

        {/* Filter buttons */}
        <div className="d-flex justify-content-center mb-4">
          <MDBBtn
            className={`btn btn-sm ${selectedFilters.title ? 'btn-dark' : 'btn-light'}`}
            onClick={() => toggleFilter('title')}
          >
            Title
          </MDBBtn>
          <span className="mx-2"></span>
          <MDBBtn
            className={`btn btn-sm ${selectedFilters.description ? 'btn-dark' : 'btn-light'}`}
            onClick={() => toggleFilter('description')}
          >
            Description
          </MDBBtn>
          <span className="mx-2"></span>
          <MDBBtn
            className={`btn btn-sm ${selectedFilters.price ? 'btn-dark' : 'btn-light'}`}
            onClick={() => toggleFilter('price')}
          >
            Price
          </MDBBtn>
          <span className="mx-2"></span>
          <MDBBtn
            className={`btn btn-sm ${selectedFilters.tags ? 'btn-dark' : 'btn-light'}`}
            onClick={() => toggleFilter('tags')}
          >
            <FontAwesomeIcon icon={faTags} />
          </MDBBtn>
        </div>
      </div>

      {result.length > 0 ? (
        <div>
          <section className="vh-100" style={{ backgroundColor: '#eee', width: '100%' }}>
            <MDBContainer className="py-5 h-100">
              {result.map((servicedata) => (
                <MDBRow
                  className="justify-content-center align-items-center h-100"
                  key={servicedata._id}
                >
                  <MDBCol xl="10">
                    <MDBCard className="mb-5" style={{ borderRadius: '15px', width: '100%' }}>
                      <MDBCardBody className="p-4">
                        <MDBTypography className="text-center my-4" tag="h3">
                          {servicedata.title}
                        </MDBTypography>
                        <MDBCardText className="medium">
                          <MDBRow className="my-4">
                            <MDBCol md="1" className="d-flex align-items-center justify-content-center">
                              <FontAwesomeIcon icon={faClipboard} className="fa-xl" />
                            </MDBCol>
                            <MDBCol md="9">{servicedata.description}</MDBCol>
                          </MDBRow>
                          <MDBRow className="my-4">
                            <MDBCol md="1" className="d-flex align-items-center justify-content-center">
                              <FontAwesomeIcon icon={faMoneyBill} className="fa-xl" />
                            </MDBCol>
                            <MDBCol md="9">{servicedata.price}</MDBCol>
                          </MDBRow>
                          <br></br>
                          <MDBRow className="my-4">
                            <MDBCol md="2" className="d-flex align-items-center justify-content-center"></MDBCol>
                            <MDBCol md="8">
                              <MDBBtn
                                id="btnfont"
                                color="dark"
                                className="w-100 mb-4"
                                onClick={() => {
                                  setShowModal(true); // Show the modal when clicked on "Hire Service"
                                  setServiceDescription(''); // Clear the previous service description
                                  setVariables(servicedata._id, servicedata.userid, servicedata.price);
                                }}
                              >
                                Hire Service
                              </MDBBtn>
                            </MDBCol>
                          </MDBRow>
                        </MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              ))}
            </MDBContainer>
          </section>
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>No search results found.
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </p>
      )}

      {/* Modal */}
      {/* <MDBBtn onClick={() => setShowModal(true)}>Hire Service</MDBBtn> */}
          <MDBModal show={showModal} setShow={setShowModal} tabIndex="-1">
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Hire Service</MDBModalTitle>
                  <MDBBtn className="btn-close" color="none" onClick={() => setShowModal(false)}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <div className="mb-3">
                    <label htmlFor="serviceDescription" className="form-label">
                      Describe what you want the seller to do
                    </label>
                    <textarea
                      className="form-control"
                      id="serviceDescription"
                      rows={5}
                      value={serviceDescription}
                      onChange={(e) => setServiceDescription(e.target.value)}
                    />
                  </div>
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={() => setShowModal(false)}>
                    Close
                  </MDBBtn>
                  
                  <MDBBtn color="dark" onClick={createOrder}>
                    Confirm Service Order
                  </MDBBtn>
                 
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>


    </div>
  );
}
