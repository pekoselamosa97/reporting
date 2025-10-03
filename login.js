import React, { useState } from 'react';
import { Card, Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ 
    email: '', 
    password: '', 
    userType: 'lecturer' 
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.email && credentials.password) {
      const userData = {
        name: getMockUserName(credentials.userType),
        email: credentials.email,
        id: Math.random().toString(36).substr(2, 9)
      };
      onLogin(userData, credentials.userType);
    } else {
      setError('Please enter valid credentials');
    }
  };

  const getMockUserName = (type) => {
    const names = {
      student: 'Student User',
      lecturer: 'Lecturer User',
      'principal-lecturer': 'Principal Lecturer',
      'program-leader': 'Program Leader'
    };
    return names[type] || 'User';
  };

  return (
    <Container fluid className="login-container d-flex align-items-center justify-content-center">
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <Card className="shadow">
            <Card.Header className="text-center bg-primary text-white">
              <h4>LUCT Faculty Reporting System</h4>
              <p className="mb-0">Login to continue</p>
            </Card.Header>
            <Card.Body className="p-4">
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>User Type</Form.Label>
                  <Form.Select 
                    value={credentials.userType}
                    onChange={(e) => setCredentials({...credentials, userType: e.target.value})}
                  >
                    <option value="student">Student</option>
                    <option value="lecturer">Lecturer</option>
                    <option value="principal-lecturer">Principal Lecturer</option>
                    <option value="program-leader">Program Leader</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 py-2">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;