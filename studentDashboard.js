import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import Monitoring from './monitoring';
import Rating from './rating';

const StudentDashboard = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'monitoring';

  const renderContent = () => {
    switch (activeTab) {
      case 'rating':
        return <Rating />;
      case 'monitoring':
      default:
        return <Monitoring />;
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2>Student Dashboard</h2>
          <p className="text-muted">Monitor your classes and provide ratings</p>
        </Col>
      </Row>
      {renderContent()}
    </Container>
  );
};

export default StudentDashboard;