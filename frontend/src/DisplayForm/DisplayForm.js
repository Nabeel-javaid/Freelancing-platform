import React, { useState, useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function DisplayForm() {
  const [listofUsers, setlistofUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        const response = await fetch('/service/viewusers', {
          headers: headers
        });

        if (response.ok) {
          const data = await response.json();
          setlistofUsers(data);
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="CustomerDetails">
        <br/><br/><br/><br/>
      {listofUsers.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <MDBTable>
          <MDBTableHead light>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Email</th>
              <th scope='col'>Name</th>
              <th scope='col'>Password</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {listofUsers.map((customer, i) => (
              <tr key={i}>
                <th scope='row'>{i + 1}</th>
                <td>{customer.email}</td>
                <td>{customer.username}</td>
                <td>{customer.password}</td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      )}
      <br/><br/><br/><br/><br/><br/>
    </div>
  );
}

export default DisplayForm;
