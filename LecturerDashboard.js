import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ReportingForm from './ReportingForm';
import Classes from './Classes';
import Reports from './Reports';
import Monitoring from './Monitoring';

const LecturerDashboard = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'reporting';

  const renderContent = () => {
    switch (activeTab) {
      case 'classes':
        return <Classes />;
      case 'reports':
        return <Reports />;
      case 'monitoring':
        return <Monitoring />;
      case 'rating':
        return <div>Rating Component</div>;
      case 'reporting':
      default:
        return <ReportingForm />;
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2>Lecturer Dashboard</h2>
          <p className="text-muted">Manage your classes and submit reports</p>
        </Col>
      </Row>
      {renderContent()}
    </Container>
  );
};

export default LecturerDashboard;