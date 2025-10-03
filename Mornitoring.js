import React, { useState } from 'react';
import { Card, Table, ProgressBar, Form, InputGroup, Button, Row, Col, Badge, Tabs, Tab } from 'react-bootstrap';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const Monitoring = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  // Enhanced mock data with attendance and outcomes tracking
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
      lastActivity: '2025-08-15',
      attendance: [
        { week: 1, present: 23, total: 25, rate: 92 },
        { week: 2, present: 24, total: 25, rate: 96 },
        { week: 3, present: 22, total: 25, rate: 88 },
        { week: 4, present: 25, total: 25, rate: 100 },
        { week: 5, present: 21, total: 25, rate: 84 },
        { week: 6, present: 23, total: 25, rate: 92 }
      ],
      outcomes: [
        { id: 'LO1', description: 'HTML & CSS Fundamentals', status: 'completed', coverage: 100 },
        { id: 'LO2', description: 'JavaScript Basics', status: 'completed', coverage: 100 },
        { id: 'LO3', description: 'React Components', status: 'in-progress', coverage: 75 },
        { id: 'LO4', description: 'State Management', status: 'in-progress', coverage: 50 },
        { id: 'LO5', description: 'API Integration', status: 'not-started', coverage: 0 },
        { id: 'LO6', description: 'Deployment', status: 'not-started', coverage: 0 }
      ],
      avgAttendance: 92,
      outcomesCoverage: 54
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
      lastActivity: '2025-08-16',
      attendance: [
        { week: 1, present: 28, total: 30, rate: 93 },
        { week: 2, present: 27, total: 30, rate: 90 },
        { week: 3, present: 29, total: 30, rate: 97 },
        { week: 4, present: 26, total: 30, rate: 87 },
        { week: 5, present: 25, total: 30, rate: 83 }
      ],
      outcomes: [
        { id: 'LO1', description: 'Database Concepts', status: 'completed', coverage: 100 },
        { id: 'LO2', description: 'ER Diagrams', status: 'completed', coverage: 100 },
        { id: 'LO3', description: 'SQL Basics', status: 'completed', coverage: 100 },
        { id: 'LO4', description: 'Normalization', status: 'in-progress', coverage: 80 },
        { id: 'LO5', description: 'Advanced SQL', status: 'not-started', coverage: 0 },
        { id: 'LO6', description: 'Transaction Management', status: 'not-started', coverage: 0 }
      ],
      avgAttendance: 90,
      outcomesCoverage: 63
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
      lastActivity: '2025-08-14',
      attendance: [
        { week: 1, present: 20, total: 22, rate: 91 },
        { week: 2, present: 21, total: 22, rate: 95 },
        { week: 3, present: 22, total: 22, rate: 100 },
        { week: 4, present: 19, total: 22, rate: 86 },
        { week: 5, present: 21, total: 22, rate: 95 },
        { week: 6, present: 20, total: 22, rate: 91 },
        { week: 7, present: 22, total: 22, rate: 100 }
      ],
      outcomes: [
        { id: 'LO1', description: 'Network Fundamentals', status: 'completed', coverage: 100 },
        { id: 'LO2', description: 'Cryptography Basics', status: 'completed', coverage: 100 },
        { id: 'LO3', description: 'Firewall Configuration', status: 'completed', coverage: 100 },
        { id: 'LO4', description: 'Intrusion Detection', status: 'completed', coverage: 100 },
        { id: 'LO5', description: 'VPN Technologies', status: 'in-progress', coverage: 60 },
        { id: 'LO6', description: 'Security Policies', status: 'not-started', coverage: 0 }
      ],
      avgAttendance: 94,
      outcomesCoverage: 77
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
      lastActivity: '2025-08-10',
      attendance: [
        { week: 1, present: 26, total: 28, rate: 93 },
        { week: 2, present: 27, total: 28, rate: 96 },
        { week: 3, present: 25, total: 28, rate: 89 },
        { week: 4, present: 28, total: 28, rate: 100 },
        { week: 5, present: 26, total: 28, rate: 93 },
        { week: 6, present: 27, total: 28, rate: 96 },
        { week: 7, present: 28, total: 28, rate: 100 },
        { week: 8, present: 25, total: 28, rate: 89 },
        { week: 9, present: 26, total: 28, rate: 93 },
        { week: 10, present: 27, total: 28, rate: 96 }
      ],
      outcomes: [
        { id: 'LO1', description: 'SDLC', status: 'completed', coverage: 100 },
        { id: 'LO2', description: 'Agile Methodology', status: 'completed', coverage: 100 },
        { id: 'LO3', description: 'Requirements Engineering', status: 'completed', coverage: 100 },
        { id: 'LO4', description: 'UML Diagrams', status: 'completed', coverage: 100 },
        { id: 'LO5', description: 'Testing Strategies', status: 'completed', coverage: 100 },
        { id: 'LO6', description: 'Project Management', status: 'completed', coverage: 100 }
      ],
      avgAttendance: 94,
      outcomesCoverage: 100
    },
    { 
      id: 5, 
      course: 'Mobile App Development', 
      code: 'MAD2110',
      completion: 30, 
      students: 20, 
      upcoming: '2025-03-25',
      lecturer: 'Prof. Seele',
      status: 'In Progress',
      weeksCompleted: 3,
      totalWeeks: 10,
      lastActivity: '2025-03-17',
      attendance: [
        { week: 1, present: 18, total: 20, rate: 90 },
        { week: 2, present: 17, total: 20, rate: 85 },
        { week: 3, present: 16, total: 20, rate: 80 }
      ],
      outcomes: [
        { id: 'LO1', description: 'Mobile UI Design', status: 'in-progress', coverage: 70 },
        { id: 'LO2', description: 'React Native Basics', status: 'in-progress', coverage: 50 },
        { id: 'LO3', description: 'Navigation', status: 'not-started', coverage: 0 },
        { id: 'LO4', description: 'State Management', status: 'not-started', coverage: 0 },
        { id: 'LO5', description: 'API Integration', status: 'not-started', coverage: 0 },
        { id: 'LO6', description: 'App Deployment', status: 'not-started', coverage: 0 }
      ],
      avgAttendance: 85,
      outcomesCoverage: 20
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

  // Calculate overall statistics
  const overallStats = {
    avgCompletion: Math.round(mockData.reduce((sum, item) => sum + item.completion, 0) / mockData.length),
    totalStudents: mockData.reduce((sum, item) => sum + item.students, 0),
    coursesBelow50: mockData.filter(item => item.completion < 50).length,
    upcomingClasses: mockData.filter(item => item.upcoming !== 'Completed').length,
    avgAttendance: Math.round(mockData.reduce((sum, item) => sum + item.avgAttendance, 0) / mockData.length),
    avgOutcomesCoverage: Math.round(mockData.reduce((sum, item) => sum + item.outcomesCoverage, 0) / mockData.length)
  };

  // Prepare data for charts
  const attendanceTrendData = mockData.flatMap(course => 
    course.attendance.map(week => ({
      course: course.course,
      week: week.week,
      attendance: week.rate
    }))
  );

  const outcomesCoverageData = mockData.map(course => ({
    course: course.course,
    coverage: course.outcomesCoverage,
    completed: course.outcomes.filter(o => o.status === 'completed').length,
    total: course.outcomes.length
  }));

  const weeklyAttendanceData = Array.from({ length: 10 }, (_, week) => {
    const weekData = { week: week + 1 };
    mockData.forEach(course => {
      const weekAttendance = course.attendance.find(a => a.week === week + 1);
      weekData[course.course] = weekAttendance ? weekAttendance.rate : null;
    });
    return weekData;
  });

  const getVariant = (percentage) => {
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'warning';
    return 'danger';
  };

  const getStatusVariant = (status) => {
    return status === 'Completed' ? 'success' : 'primary';
  };

  const getOutcomeStatusVariant = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'not-started': return 'secondary';
      default: return 'secondary';
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilterStatus('all');
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-0">Academic Monitoring Dashboard</h5>
          <small className="text-muted">Track attendance, progress, and learning outcomes across all courses</small>
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
        {/* Enhanced Summary Statistics */}
        <div className="mb-4 p-3 bg-light rounded">
          <Row className="text-center">
            <Col md={2}>
              <div className="border-end">
                <h4 className="text-primary mb-0">{overallStats.avgCompletion}%</h4>
                <small className="text-muted">Avg Completion</small>
              </div>
            </Col>
            <Col md={2}>
              <div className="border-end">
                <h4 className="text-success mb-0">{overallStats.totalStudents}</h4>
                <small className="text-muted">Total Students</small>
              </div>
            </Col>
            <Col md={2}>
              <div className="border-end">
                <h4 className="text-warning mb-0">{overallStats.coursesBelow50}</h4>
                <small className="text-muted">Courses Below 50%</small>
              </div>
            </Col>
            <Col md={2}>
              <div className="border-end">
                <h4 className="text-info mb-0">{overallStats.avgAttendance}%</h4>
                <small className="text-muted">Avg Attendance</small>
              </div>
            </Col>
            <Col md={2}>
              <div className="border-end">
                <h4 className="text-secondary mb-0">{overallStats.avgOutcomesCoverage}%</h4>
                <small className="text-muted">Outcomes Coverage</small>
              </div>
            </Col>
            <Col md={2}>
              <div>
                <h4 className="text-danger mb-0">{overallStats.upcomingClasses}</h4>
                <small className="text-muted">Upcoming Classes</small>
              </div>
            </Col>
          </Row>
        </div>

        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
          {/* Overview Tab */}
          <Tab eventKey="overview" title="Course Overview">
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
                    <th>Attendance</th>
                    <th>Outcomes</th>
                    <th>Students</th>
                    <th>Status</th>
                    <th>Weeks</th>
                    <th>Next Class</th>
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
                          <div style={{ width: '50px' }} className="me-2">
                            {item.completion}%
                          </div>
                          <div style={{ width: '100px' }}>
                            <ProgressBar 
                              now={item.completion} 
                              variant={getVariant(item.completion)}
                              style={{ height: '8px' }}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div style={{ width: '50px' }} className="me-2">
                            {item.avgAttendance}%
                          </div>
                          <div style={{ width: '80px' }}>
                            <ProgressBar 
                              now={item.avgAttendance} 
                              variant={getVariant(item.avgAttendance)}
                              style={{ height: '6px' }}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div style={{ width: '50px' }} className="me-2">
                            {item.outcomesCoverage}%
                          </div>
                          <div style={{ width: '80px' }}>
                            <ProgressBar 
                              now={item.outcomesCoverage} 
                              variant={getVariant(item.outcomesCoverage)}
                              style={{ height: '6px' }}
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
                        <div className="d-flex gap-1">
                          <Button variant="outline-primary" size="sm" title="View Details">
                            <i className="bi bi-eye"></i>
                          </Button>
                          <Button variant="outline-success" size="sm" title="Generate Report">
                            <i className="bi bi-graph-up"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Tab>

          {/* Attendance Trends Tab */}
          <Tab eventKey="attendance" title="Attendance Trends">
            <Row>
              <Col md={8}>
                <Card className="mb-4">
                  <Card.Header>
                    <h6 className="mb-0">Weekly Attendance Trends</h6>
                  </Card.Header>
                  <Card.Body>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={weeklyAttendanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        {mockData.map((course, index) => (
                          <Line 
                            key={course.id}
                            type="monotone" 
                            dataKey={course.course}
                            stroke={COLORS[index % COLORS.length]}
                            strokeWidth={2}
                            dot={{ r: 4 }}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="mb-4">
                  <Card.Header>
                    <h6 className="mb-0">Attendance Distribution</h6>
                  </Card.Header>
                  <Card.Body>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={mockData.map(course => ({
                            name: course.course,
                            value: course.avgAttendance
                          }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {mockData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Card>
              <Card.Header>
                <h6 className="mb-0">Detailed Attendance Records</h6>
              </Card.Header>
              <Card.Body>
                <Table responsive striped size="sm">
                  <thead>
                    <tr>
                      <th>Course</th>
                      {[1,2,3,4,5,6,7,8,9,10].map(week => (
                        <th key={week}>Week {week}</th>
                      ))}
                      <th>Average</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockData.map(course => (
                      <tr key={course.id}>
                        <td>
                          <strong>{course.course}</strong>
                          <br />
                          <small className="text-muted">{course.lecturer}</small>
                        </td>
                        {[1,2,3,4,5,6,7,8,9,10].map(week => {
                          const attendance = course.attendance.find(a => a.week === week);
                          return (
                            <td key={week}>
                              {attendance ? (
                                <Badge bg={getVariant(attendance.rate)}>
                                  {attendance.rate}%
                                </Badge>
                              ) : (
                                <Badge bg="secondary">-</Badge>
                              )}
                            </td>
                          );
                        })}
                        <td>
                          <Badge bg={getVariant(course.avgAttendance)}>
                            {course.avgAttendance}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Tab>

          {/* Outcomes Coverage Tab */}
          <Tab eventKey="outcomes" title="Outcomes Coverage">
            <Row>
              <Col md={8}>
                <Card className="mb-4">
                  <Card.Header>
                    <h6 className="mb-0">Learning Outcomes Coverage</h6>
                  </Card.Header>
                  <Card.Body>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={outcomesCoverageData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="course" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="coverage" name="Coverage %" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="mb-4">
                  <Card.Header>
                    <h6 className="mb-0">Outcomes Progress</h6>
                  </Card.Header>
                  <Card.Body>
                    <div className="text-center">
                      <h4 className="text-primary">{overallStats.avgOutcomesCoverage}%</h4>
                      <p className="text-muted">Average Outcomes Coverage</p>
                      <ProgressBar 
                        now={overallStats.avgOutcomesCoverage} 
                        variant={getVariant(overallStats.avgOutcomesCoverage)}
                        className="mb-3"
                      />
                      
                      <div className="d-flex justify-content-between small text-muted">
                        <span>Completed: {mockData.reduce((sum, course) => 
                          sum + course.outcomes.filter(o => o.status === 'completed').length, 0)}
                        </span>
                        <span>Total: {mockData.reduce((sum, course) => 
                          sum + course.outcomes.length, 0)}
                        </span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Card>
              <Card.Header>
                <h6 className="mb-0">Detailed Outcomes Tracking</h6>
              </Card.Header>
              <Card.Body>
                {mockData.map(course => (
                  <div key={course.id} className="mb-4">
                    <h6>{course.course} - {course.outcomesCoverage}% Coverage</h6>
                    <div className="mb-2">
                      <ProgressBar 
                        now={course.outcomesCoverage} 
                        variant={getVariant(course.outcomesCoverage)}
                        className="mb-2"
                      />
                    </div>
                    <Row>
                      {course.outcomes.map(outcome => (
                        <Col md={6} key={outcome.id} className="mb-2">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="small">{outcome.description}</span>
                            <Badge bg={getOutcomeStatusVariant(outcome.status)}>
                              {outcome.status.replace('-', ' ')}
                            </Badge>
                          </div>
                        </Col>
                      ))}
                    </Row>
                    <hr />
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>

        {/* Quick Actions */}
        <div className="mt-3 d-flex gap-2 justify-content-end">
          <Button variant="outline-primary" size="sm">
            <i className="bi bi-download me-2"></i>
            Export Monitoring Data
          </Button>
          <Button variant="outline-success" size="sm">
            <i className="bi bi-graph-up me-2"></i>
            Generate Analytics Report
          </Button>
          <Button variant="outline-info" size="sm">
            <i className="bi bi-bell me-2"></i>
            Send Alerts
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Monitoring;