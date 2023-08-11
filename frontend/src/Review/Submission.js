import React, { useEffect, useState } from 'react';
import { Link , useLocation} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from 'mdb-react-ui-kit';

export default function Submission() {
  const [customerinfo, setCustomerinfo] = useState(null);

  const location = useLocation();
  const newdata = location.state;

  const [id , setid] = useState(newdata.id);
  const [cookies] = useCookies(['accessToken']);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`/service/getreview/:${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        });
        const data = await response.json();
        setCustomerinfo(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, [cookies.accessToken]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/service/deletereview`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      });

      if (response.ok) {
        // Delete successful, navigate to a different page or update the state as needed
        console.log('Review deleted');
      } else {
        console.log('Failed to delete the review');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      {customerinfo === null ? (
        <p>Loading...</p>
      ) : (
        <section style={{ backgroundColor: '#FBFBFB' }}>
          <MDBContainer className="py-5">
            <MDBRow>
              <MDBCol md="6" className="offset-md-3">
                <MDBCard className="text-center">
                  <MDBCardBody>
                    <MDBTable responsive>
                      <MDBTableHead>
                        <tr>
                          <th>Rating</th>
                          <th>Description</th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        <tr>
                          <td>{customerinfo.user.star}</td>
                          <td>{customerinfo.user.desc}</td>
                        </tr>
                      </MDBTableBody>
                    </MDBTable>
                    <div className="d-flex justify-content-center mt-4">
                      <Link to="/editreview" className="btn btn-primary me-2" state={{ from: customerinfo }}>
                        Edit
                      </Link>
                      <Link to="/feedbackform" className="btn btn-secondary" onClick={handleDelete}>
                        Delete
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      )}
   </div>
 );
}