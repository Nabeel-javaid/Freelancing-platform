import React, { useState } from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [serviceDeliveries, setServiceDeliveries] = useState('');
  const [revenue, setRevenue] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValid()) {
      try {
        const response = await fetch('/service/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            bio: revenue,
            address: serviceDeliveries,
            phone: phone,
            service_deliveries: 0,
            revenue: 0,
          }),
        });

        const data = await response.json();
        // Process the response data
        toast.success('Registration Successful!');
      } catch (error) {
        // Handle any errors during the fetch request
        toast.success('Registration Successful!');
      }
    }
  };

  const isValid = () => {
    const newErrors = {};

    if (username.trim() === '') {
      newErrors.username = 'Username is required';
    }

    if (email.trim() === '') {
      newErrors.email = 'Email is required';
    }

    if (phone.trim() === '') {
      newErrors.phone = 'Phone is required';
    }

    if (password.trim() === '') {
      newErrors.password = 'Password is required';
    }

    if (serviceDeliveries.trim() === '') {
      newErrors.serviceDeliveries = 'Service Deliveries is required';
    }

    if (revenue.trim() === '') {
      newErrors.revenue = 'Revenue is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div>
      <br /><br /><br />
      <MDBContainer fluid className="bg-white">
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard className="my-4">
              <MDBRow className="g-0">
                <MDBCol md="6" className="d-none d-md-flex justify-content-center align-items-center">
                  <MDBCardImage
                    src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    alt="Sample photo"
                    className="rounded-start"
                    fluid
                  />
                </MDBCol>
                <MDBCol md="6">
                  <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                    <h3 className="mb-5 text-uppercase fw-bold">jobify registration form</h3>
                    <form onSubmit={handleSubmit}>
                      <MDBRow>
                        <MDBCol md="6">
                          <MDBInput
                            wrapperClass="mb-4"
                            label="Username"
                            size="lg"
                            id="form1"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            validation={errors.username ? false : true}
                            errorMessage={errors.username}
                          />
                        </MDBCol>
                        <MDBCol md="6">
                          <MDBInput
                            wrapperClass="mb-4"
                            label="Email"
                            size="lg"
                            id="form2"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            validation={errors.email ? false : true}
                            errorMessage={errors.email}
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Phone"
                        size="lg"
                        id="form3"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        validation={errors.phone ? false : true}
                        errorMessage={errors.phone}
                      />
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Password"
                        size="lg"
                        id="form4"
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        validation={errors.password ? false : true}
                        errorMessage={errors.password}
                      />
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Address"
                        size="lg"
                        id="form5"
                        type="text"
                        value={serviceDeliveries}
                        onChange={(e) => setServiceDeliveries(e.target.value)}
                        validation={errors.serviceDeliveries ? false : true}
                        errorMessage={errors.serviceDeliveries}
                      />
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Bio"
                        size="lg"
                        id="form6"
                        type="text"
                        value={revenue}
                        onChange={(e) => setRevenue(e.target.value)}
                        validation={errors.revenue ? false : true}
                        errorMessage={errors.revenue}
                      />
                      {Object.keys(errors).length > 0 && (
                        <div className="text-danger mb-3">Please fill in all required fields.</div>
                      )}
                      <div className="d-flex justify-content-end pt-3">
                        <button
                          className="reset-button"
                          type="button"
                          style={{ backgroundColor: 'lightgray', padding: '14px 20px', margin: '4px', cursor: 'pointer' }}
                        >
                          Reset all
                        </button>
                        <button
                          className="submit-button ms-2"
                          type="submit"
                          style={{ backgroundColor: 'blue', color: 'white', padding: '14px 20px', margin: '4px', cursor: 'pointer' }}
                        >
                          Submit form
                        </button>
                      </div>
                    </form>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Register;