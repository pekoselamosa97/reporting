import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import Courses from './courses';
import Reports from './Reports';

const PLDashboard = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'courses';

  const renderContent = () => {
    switch (activeTab) {
      case 'reports':
        return <Reports />;
      case 'monitoring':
        return <div>Monitoring View</div>;
      case 'classes':
        return <div>Classes View</div>;
      case 'lectures':
        return <div>Lectures View</div>;
      case 'rating':
        return <div>Rating View</div>;
      case 'courses':
      default:
        return <Courses />;
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2>Program Leader Dashboard</h2>
          <p className="text-muted">Manage program courses and view reports</p>
        </Col>
      </Row>
      {renderContent()}
    </Container>
  );
};

export default PLDashboard;