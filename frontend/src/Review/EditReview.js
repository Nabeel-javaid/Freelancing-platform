import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from 'mdb-react-ui-kit';
import { useCookies } from 'react-cookie';

export default function EditProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { from } = location.state;
  const [pusername, setpusername] = useState(from.user.star);
  const [pemail, setpemail] = useState(from.user.desc);
  const [user_id] = useState(from.user._id);

    const [cookies] = useCookies(['accessToken']);

  const validateInput = async (event) => {
    event.preventDefault();

    const star = pusername;
    const desc = pemail;
   
    await fetch(`/service/updatereview`, {
      method: 'PUT',
      body: JSON.stringify({star, desc }),
      headers: { 'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies.accessToken}` },
    });

    console.log('Updated');
    navigate('/submission');
    
  };

  return (
    <section style={{ backgroundColor: '#FBFBFB' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol md="6" className="offset-md-3">
            <MDBCard className="text-center">
              <MDBCardBody>
                <MDBCardImage
             
                />
                <MDBTable responsive className="text-center">
                  <MDBTableHead >
                    <tr>
                      <th>Rating</th>
                      <th>Description</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>
                        <input
                          type="username"
                          value={pusername}
                          onChange={(e) => setpusername(e.target.value)}
                          style={{ textAlign: 'center' }}
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          value={pemail}
                          onChange={(e) => setpemail(e.target.value)}
                          style={{ textAlign: 'center' }}
                        />
                      </td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
                <div className="d-flex justify-content-center mt-4">
                  <Link to="" className="btn btn-primary me-2" onClick={validateInput}>Done</Link>
                  <button className="btn btn-secondary">Message</button>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
 );
}