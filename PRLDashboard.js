import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import Courses from './Courses';
import Reports from './Reports';

const PRLDashboard = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'courses';

  const renderContent = () => {
    switch (activeTab) {
      case 'reports':
        return <Reports />;
      case 'monitoring':
        return <div className="p-4 text-center">Monitoring View - Coming Soon</div>;
      case 'courses':
      default:
        return <Courses />;
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2>Principal Lecturer Dashboard</h2>
          <p className="text-muted">Manage courses and review reports</p>
        </Col>
      </Row>
      {renderContent()}
    </Container>
  );
};

export default PRLDashboard;