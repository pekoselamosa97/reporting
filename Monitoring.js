import React, { useState } from 'react';
import { Card, Table, ProgressBar, Form, InputGroup, Button, Row, Col, Badge } from 'react-bootstrap';

const Monitoring = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, active, completed

  const mockData = [
    { 
      id: 1, 
      course: 'Web Development', 
      code: 'DIWA2110',
      completion: 75, 
      students: 25, 
      upcoming: '2025-08-22',
      lecturer: 'Dr.Pekosela',
      status: 'In Progress',
      weeksCompleted: 6,
      totalWeeks: 8,
      lastActivity: '2025-08-15'
    },
    { 
      id: 2, 
      course: 'Database Systems', 
      code: 'DBS2110',
      completion: 60, 
      students: 30, 
      upcoming: '2025-08-23',
      lecturer: 'Prof.Morie',
      status: 'In Progress',
      weeksCompleted: 5,
      totalWeeks: 10,
      lastActivity: '2025-08-16'
    },
    { 
      id: 3, 
      course: 'Network Security', 
      code: 'NTS2110',
      completion: 85, 
      students: 22, 
      upcoming: '2025-09-24',
      lecturer: 'Dr.Maliehe',
      status: 'In Progress',
      weeksCompleted: 7,
      totalWeeks: 8,
      lastActivity: '2025-08-14'
    },
    { 
      id: 4, 
      course: 'Software Engineering', 
      code: 'SEN2110',
      completion: 100, 
      students: 28, 
      upcoming: 'Completed',
      lecturer: 'Dr. Mpoka',
      status: 'Completed',
      weeksCompleted: 10,
      totalWeeks: 10,
      lastActivity: '2025-08-10'
    },
    { 
      id: 5, 
      course: 'Mobile App Development', 
      code: 'MAD2110',
      completion: 30, 
      students: 20, 
      upcoming: '2024-03-25',
      lecturer: 'Prof. Seele',
      status: 'In Progress',
      weeksCompleted: 3,
      totalWeeks: 10,
      lastActivity: '2024-03-17'
    }
  ];

  // Filter data based on search term and status
  const filteredData = mockData.filter(item => {
    const matchesSearch = item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.lecturer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && item.status === 'In Progress') ||
                         (filterStatus === 'completed' && item.status === 'Completed');
    
    return matchesSearch && matchesStatus;
  });

  const getVariant = (percentage) => {
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'warning';
    return 'danger';
  };

  const getStatusVariant = (status) => {
    return status === 'Completed' ? 'success' : 'primary';
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilterStatus('all');
  };

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-0">Course Monitoring</h5>
          <small className="text-muted">Track progress and upcoming classes</small>
        </div>
        <div className="d-flex align-items-center gap-2">
          {/* Status Filter */}
          <Form.Select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ width: '150px' }}
          >
            <option value="all">All Status</option>
            <option value="active">In Progress</option>
            <option value="completed">Completed</option>
          </Form.Select>

          {/* Search Input */}
          <InputGroup style={{ width: '300px' }}>
            <Form.Control 
              placeholder="Search courses, codes, or lecturers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-secondary">
              <i className="bi bi-search"></i>
            </Button>
            {(searchTerm || filterStatus !== 'all') && (
              <Button 
                variant="outline-danger" 
                onClick={handleClearSearch}
                title="Clear search and filters"
              >
                <i className="bi bi-x-circle"></i>
              </Button>
            )}
          </InputGroup>
        </div>
      </Card.Header>
      
      <Card.Body>
        {/* Search Results Summary */}
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <div>
            <span className="text-muted">
              Showing {filteredData.length} of {mockData.length} courses
              {searchTerm && (
                <span> for "<strong>{searchTerm}</strong>"</span>
              )}
              {filterStatus !== 'all' && (
                <span> - <Badge bg="info">{filterStatus}</Badge></span>
              )}
            </span>
          </div>
          <div>
            <Badge bg="primary" className="me-2">
              Active: {mockData.filter(item => item.status === 'In Progress').length}
            </Badge>
            <Badge bg="success">
              Completed: {mockData.filter(item => item.status === 'Completed').length}
            </Badge>
          </div>
        </div>

        {filteredData.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-search text-muted" style={{ fontSize: '3rem' }}></i>
            <h5 className="mt-3">No courses found</h5>
            <p className="text-muted">
              {searchTerm ? `No courses match "${searchTerm}"` : 'No courses match the current filters'}
            </p>
            <Button variant="outline-primary" onClick={handleClearSearch}>
              <i className="bi bi-arrow-clockwise me-2"></i>
              Clear Search & Filters
            </Button>
          </div>
        ) : (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Course</th>
                <th>Progress</th>
                <th>Students</th>
                <th>Status</th>
                <th>Weeks</th>
                <th>Next Class</th>
                <th>Last Activity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div>
                      <strong>{item.course}</strong>
                      <br />
                      <small className="text-muted">
                        {item.code} • {item.lecturer}
                      </small>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div style={{ width: '80px' }} className="me-2">
                        {item.completion}%
                      </div>
                      <div style={{ width: '150px' }}>
                        <ProgressBar 
                          now={item.completion} 
                          variant={getVariant(item.completion)}
                          style={{ height: '8px' }}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <Badge bg="info">{item.students} students</Badge>
                  </td>
                  <td>
                    <Badge bg={getStatusVariant(item.status)}>
                      {item.status}
                    </Badge>
                  </td>
                  <td>
                    <small>
                      {item.weeksCompleted}/{item.totalWeeks} weeks
                    </small>
                  </td>
                  <td>
                    {item.status === 'Completed' ? (
                      <Badge bg="success">Course Completed</Badge>
                    ) : (
                      <span>{item.upcoming}</span>
                    )}
                  </td>
                  <td>
                    <small className="text-muted">{item.lastActivity}</small>
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      <Button variant="outline-primary" size="sm" title="View Details">
                        <i className="bi bi-eye"></i>
                      </Button>
                      <Button variant="outline-success" size="sm" title="Generate Report">
                        <i className="bi bi-graph-up"></i>
                      </Button>
                      <Button variant="outline-info" size="sm" title="Send Reminder">
                        <i className="bi bi-bell"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Summary Statistics */}
        <div className="mt-4 p-3 bg-light rounded">
          <Row className="text-center">
            <Col md={3}>
              <div className="border-end">
                <h4 className="text-primary mb-0">
                  {Math.round(mockData.reduce((sum, item) => sum + item.completion, 0) / mockData.length)}%
                </h4>
                <small className="text-muted">Average Completion</small>
              </div>
            </Col>
            <Col md={3}>
              <div className="border-end">
                <h4 className="text-success mb-0">
                  {mockData.reduce((sum, item) => sum + item.students, 0)}
                </h4>
                <small className="text-muted">Total Students</small>
              </div>
            </Col>
            <Col md={3}>
              <div className="border-end">
                <h4 className="text-warning mb-0">
                  {mockData.filter(item => item.completion < 50).length}
                </h4>
                <small className="text-muted">Courses Below 50%</small>
              </div>
            </Col>
            <Col md={3}>
              <div>
                <h4 className="text-info mb-0">
                  {mockData.filter(item => item.upcoming !== 'Completed').length}
                </h4>
                <small className="text-muted">Upcoming Classes</small>
              </div>
            </Col>
          </Row>
        </div>

        {/* Quick Actions */}
        <div className="mt-3 d-flex gap-2 justify-content-end">
          <Button variant="outline-primary" size="sm">
            <i className="bi bi-download me-2"></i>
            Export Monitoring Data
          </Button>
          <Button variant="outline-success" size="sm">
            <i className="bi bi-graph-up me-2"></i>
            View Analytics
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Monitoring;