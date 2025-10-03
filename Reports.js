import React from 'react';
import { Card, Table, Badge, Button, Form, InputGroup } from 'react-bootstrap';

const Reports = () => {
  const mockReports = [
    { id: 1, course: 'Web Development', prl: 'Dr. Pekosela', period: 'August 2025', status: 'Approved', feedback: 'Good progress' },
    { id: 2, course: 'Database Systems', prl: 'Dr. Maliehe', period: 'September 2025', status: 'Pending', feedback: '' },
    { id: 3, course: 'Network Security', prl: 'Dr. Morie', period: 'August 2025', status: 'Approved', feedback: 'Excellent work' }
  ];

  const getStatusVariant = (status) => {
    return status === 'Approved' ? 'success' : 'warning';
  };

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Reports from Principal Lecturers</h5>
        <InputGroup style={{ width: '300px' }}>
          <Form.Control placeholder="Search reports..." />
          <Button variant="outline-secondary">Search</Button>
        </InputGroup>
      </Card.Header>
      <Card.Body>
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>Course</th>
              <th>Principal Lecturer</th>
              <th>Period</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockReports.map(report => (
              <tr key={report.id}>
                <td>
                  <strong>{report.course}</strong>
                </td>
                <td>{report.prl}</td>
                <td>{report.period}</td>
                <td>
                  <Badge bg={getStatusVariant(report.status)}>
                    {report.status}
                  </Badge>
                </td>
                <td>{report.feedback || 'No feedback'}</td>
                <td>
                  <Button variant="outline-primary" size="sm" className="me-2">
                    View Details
                  </Button>
                  <Button variant="outline-success" size="sm">
                    Download
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Reports;