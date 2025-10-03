import React from 'react';
import { Card, Table, Badge, Form, InputGroup, Button } from 'react-bootstrap';

const Monitoring = () => {
  const mockClasses = [
    { id: 1, course: 'Web Development', code: 'DIWA2110', lecturer: 'Dr.Pekosela', date: '2025-08-15', time: '10:00 AM', venue: 'Room 101', status: 'Completed' },
    { id: 2, course: 'Database Systems', code: 'DBS2110', lecturer: 'Prof.Morie', date: '2025-08-16', time: '2:00 PM', venue: 'Lab A', status: 'Upcoming' },
    { id: 3, course: 'Network Security', code: 'NTS2110', lecturer: 'Dr.Maliehe', date: '2025-08-14', time: '9:00 AM', venue: 'Room 205', status: 'Completed' }
  ];

  const getStatusVariant = (status) => {
    return status === 'Completed' ? 'success' : 'warning';
  };

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Class Monitoring</h5>
        <div className="d-flex">
          <InputGroup style={{ width: '300px' }}>
            <Form.Control placeholder="Search classes..." />
            <Button variant="outline-secondary">Search</Button>
          </InputGroup>
        </div>
      </Card.Header>
      <Card.Body>
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>Course</th>
              <th>Code</th>
              <th>Lecturer</th>
              <th>Date</th>
              <th>Time</th>
              <th>Venue</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockClasses.map(cls => (
              <tr key={cls.id}>
                <td>{cls.course}</td>
                <td>{cls.code}</td>
                <td>{cls.lecturer}</td>
                <td>{cls.date}</td>
                <td>{cls.time}</td>
                <td>{cls.venue}</td>
                <td>
                  <Badge bg={getStatusVariant(cls.status)}>
                    {cls.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Monitoring;