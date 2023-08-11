import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function FeedbackForm() {
  const [displayForm, setDisplayForm] = useState(true);
  const [emValue, setEmValue] = useState('');
  const [nmValue, setNmValue] = useState('');
  const [phValue, setPhValue] = useState('');

  const [id , setId] = useState('');

  const [cookies] = useCookies(['accessToken']);

  const [checkedVal, setCheckBoxChecked] = useState([]);

  const handleOnChange = (isChecked, value) => {
    let temp = [...checkedVal];
    const pre = value.split('_')[0];
    if (isChecked) {
      temp = temp.filter(item => item.split('_')[0] !== pre);
      temp.push(value);
      setCheckBoxChecked(temp);
      return;
    }

    setCheckBoxChecked(temp.filter(item => item !== value));
  };

  const validateForm = () => {
    setAlertVisibility(false); // Hide all alerts

    if (nmValue === '') {
      setAlertVisibility('name');
    } else if (emValue === '') {
      setAlertVisibility('email');
    } else if (!emValue.includes('.com') || !emValue.includes('@')) {
      setAlertVisibility('email');
    } else if (!phValue) {
      setAlertVisibility('phone');
    } else if (phValue.length < 13) {
      setAlertVisibility('phone');
    } else if (checkedVal.length < Object.keys(feedback_type).length) {
      const keys = Object.keys(feedback_type).filter(
        key => !checkedVal.includes(`${key}_`)
      );
      keys.forEach(key => setAlertVisibility(key));
    } else return true;
  };

  const setAlertVisibility = field => {
    const element = document.getElementById(`${field}_er`);
    if (element) element.style.display = 'block';
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      try {
        const res = await fetch("/service/uploadreview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.accessToken}`
          },
          body: JSON.stringify({  
            gigId: phValue,
            userId: emValue, 
            star: checkedVal[2], 
            desc: checkedVal[3]
             })
        });

        const data = await res.json();
        setId(data.review._id);
        // Process the response data
        console.log(data);
      } catch (error) {
        // Handle any errors during the fetch request
        console.error(error);
      }
    }
  };

  const feedback_type = {
    qos: 'Please rate the quality of the service.',
    qob: 'Please rate the quality of your work.',
    rating: 'Please rate the seller overall work experience.',
    exp: 'Please rate your overall experience.',
  };

  const feedback_opts = {
    qos: ['Excellent', 'Good', 'Fair', 'Bad'],
    qob: ['Excellent', 'Good', 'Fair', 'Bad'],
    rating: [1, 2, 3, 4, 5],
    exp: ['Excellent', 'Good', 'Fair', 'Bad']
  };

  return (
    <Container>
      {displayForm ? (
        <Card>
          <Card.Header>
            <cite title="Source Title">
              We are committed to providing you with the best gigs, so we welcome your comments.
            </cite>
          </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">Please fill out this questionnaire.</blockquote>
          </Card.Body>
          <Container className="padding30px">
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="required-field">Customer Name</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="E.g. Jon Snow"
                      value={nmValue}
                      onChange={e => setNmValue(e.target.value)}
                    />
                    <Alert variant="danger" id="name_er" style={{ display: 'none' }}>
                      &#9432;
                    </Alert>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="required-field">Email address</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      placeholder="E.g. abc@gmail.com"
                      value={emValue}
                      onChange={e => setEmValue(e.target.value)}
                    />
                    <Alert variant="danger" id="email_er" style={{ display: 'none' }}>
                      &#9432;
                    </Alert>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="required-field">Phone</Form.Label>
                    <InputGroup>
                      <PhoneInput
                        placeholder="9999999999"
                        value={phValue}
                        onChange={setPhValue}
                      />
                    </InputGroup>
                    <Alert variant="danger" id="phone_er" style={{ display: 'none' }}>
                      &#9432;
                    </Alert>
                  </Form.Group>
                </Col>
                <Col></Col>
              </Row>
              <Row>
                {Object.keys(feedback_type).map(ty => (
                  <>
                    <Col>
                      <Form.Group className="mb-3" controlId={ty}>
                        <Form.Label className="required-field">{feedback_type[ty]}</Form.Label>
                        <InputGroup>
                          <div className="mb-3">
                            {feedback_opts[ty].map((opt, key) => (
                              <Form.Check
                                inline
                                label={opt}
                                name={`${ty}_feedback_opts`}
                                id={`${ty}_${key}`}
                                checked={checkedVal.includes(`${ty}_${opt}`)}
                                onChange={e => handleOnChange(e.target.checked, `${ty}_${opt}`)}
                                type="checkbox"
                                value={opt}
                                key={key}
                              />
                            ))}
                          </div>
                        </InputGroup>
                        <Alert variant="danger" id={`er_${ty}`} style={{ display: 'none' }}>
                          &#9432;
                        </Alert>
                      </Form.Group>
                    </Col>
                    {ty === 'qob' || ty === 'exp' ? <Row /> : null}
                  </>
                ))}
              </Row>
              <Link to="/service/showservice">
              <Button className="btn_purp" onClick={handleSubmit}>
                Submit Review
              </Button>
              </Link>
              <Link
                        to={{
                          pathname: '/submission',
                          state: { id: id }
                        }}
                        className="btn btn-secondary"
                      >
                        Update Review
                      </Link>
            </Form>
          </Container>
        </Card>
      ) : (
        <Card bg="light" text="dark">
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>Thank you for your feedback!</p>
            </blockquote>
            <Button className="btn_purp" onClick={() => (window.location.href = '/submission')}>
              Close
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default FeedbackForm;