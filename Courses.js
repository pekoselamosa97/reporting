import React, { useState } from 'react';
import { Card, Table, Badge, Button, Form, Modal, Row, Col, Alert, InputGroup } from 'react-bootstrap';

const Courses = () => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Current Principal Lecturer's stream (this would come from auth context in real app)
  const currentPrincipalStream = 'Information Technology';
  
  const [courses, setCourses] = useState([
    { 
      id: 1, 
      name: 'Web Development', 
      code: 'DIWA2110', 
      lecturer: 'Dr.Pekosela', 
      lecturerEmail: 'pekosela@luct.com',
      lecturerPhone: '+26662840790',
      students: 75, 
      status: 'Active',
      stream: 'Information Technology',
      semester: 'Semester 1',
      credits: 3,
      description: 'Comprehensive course covering modern web development technologies including HTML, CSS, JavaScript, React, and Node.js.',
      learningOutcomes: [
        'Build responsive web applications',
        'Understand client-server architecture',
        'Implement modern JavaScript frameworks',
        'Deploy web applications to production'
      ],
      modules: 5,
      enrolledStudents: 75,
      maxCapacity: 80,
      startDate: '2025-08-12',
      endDate: '2025-12-10',
      reports: [
        { id: 1, week: 1, date: '2025-08-15', topics: 'HTML Basics', attendance: '28/30', status: 'Submitted' },
        { id: 2, week: 2, date: '2025-08-22', topics: 'CSS Fundamentals', attendance: '27/30', status: 'Submitted' },
        { id: 3, week: 3, date: '2025-08-29', topics: 'JavaScript Intro', attendance: '29/30', status: 'Submitted' }
      ],
      lectures: [
        { id: 1, topic: 'Introduction to HTML', date: '2025-08-15', completed: true },
        { id: 2, topic: 'CSS and Responsive Design', date: '2025-08-22', completed: true },
        { id: 3, topic: 'JavaScript Fundamentals', date: '2025-08-29', completed: true },
        { id: 4, topic: 'React Components', date: '2025-09-05', completed: true },
        { id: 5, topic: 'Node.js Backend', date: '2025-09-12', completed: false }
      ]
    },
    { 
      id: 2, 
      name: 'Database Systems', 
      code: 'DBS2110', 
      lecturer: 'Prof.Morie', 
      lecturerEmail: 'morie@luct.com',
      lecturerPhone: '+1234567891',
      students: 90, 
      status: 'Active',
      stream: 'Information Technology',
      semester: 'Semester 1',
      credits: 4,
      description: 'Fundamentals of database design, SQL programming, and database management systems.',
      learningOutcomes: [
        'Design normalized database schemas',
        'Write complex SQL queries',
        'Understand transaction management',
        'Implement database security'
      ],
      modules: 6,
      enrolledStudents: 90,
      maxCapacity: 100,
      startDate: '2025-08-01',
      endDate: '2025-12-11',
      reports: [
        { id: 1, week: 1, date: '2025-08-16', topics: 'Database Concepts', attendance: '35/35', status: 'Submitted' },
        { id: 2, week: 2, date: '2025-08-23', topics: 'ER Diagrams', attendance: '34/35', status: 'Submitted' }
      ],
      lectures: [
        { id: 1, topic: 'Database Concepts', date: '2025-08-16', completed: true },
        { id: 2, topic: 'ER Diagrams', date: '2025-08-23', completed: true },
        { id: 3, topic: 'SQL Basics', date: '2025-08-30', completed: true },
        { id: 4, topic: 'Advanced SQL', date: '2025-09-06', completed: false }
      ]
    },
    { 
      id: 3, 
      name: 'Network Security', 
      code: 'NTS2110', 
      lecturer: 'Dr. Maliehe', 
      lecturerEmail: 'maliehe@luct.com',
      lecturerPhone: '+266 59131624',
      students: 65, 
      status: 'Inactive',
      stream: 'Information Technology',
      semester: 'Semester 2',
      credits: 3,
      description: 'Advanced topics in network security, cryptography, and cybersecurity principles.',
      learningOutcomes: [
        'Understand cryptographic algorithms',
        'Implement security protocols',
        'Analyze network vulnerabilities',
        'Design secure network architectures'
      ],
      modules: 4,
      enrolledStudents: 65,
      maxCapacity: 70,
      startDate: '2025-08-10',
      endDate: '2025-12-15',
      reports: [],
      lectures: []
    },
    { 
      id: 4, 
      name: 'Software Engineering', 
      code: 'SEN2110', 
      lecturer: 'Dr. Mosa', 
      lecturerEmail: 'mosa@luct.com',
      lecturerPhone: '+266 57114808',
      students: 85, 
      status: 'Active',
      stream: 'Business Information Technology',
      semester: 'Semester 1',
      credits: 4,
      description: 'Software development methodologies, project management, and quality assurance.',
      learningOutcomes: [
        'Apply agile methodologies',
        'Manage software projects',
        'Implement testing strategies',
        'Document software systems'
      ],
      modules: 7,
      enrolledStudents: 85,
      maxCapacity: 90,
      startDate: '2025-08-01',
      endDate: '2025-12-10',
      reports: [
        { id: 1, week: 1, date: '2025-09-27', topics: 'Software Development Lifecycle', attendance: '40/40', status: 'Submitted' }
      ],
      lectures: [
        { id: 1, topic: 'Software Development Lifecycle', date: '2025-09-27', completed: true },
        { id: 2, topic: 'Agile Methodology', date: '2025-10-24', completed: true },
        { id: 3, topic: 'Requirements Engineering', date: '2025-11-11', completed: false }
      ]
    },
    { 
      id: 5, 
      name: 'Mobile App Development', 
      code: 'MAD2110', 
      lecturer: 'Prof. Seele', 
      lecturerEmail: 'seele@luct.com',
      lecturerPhone: '+266 58741236',
      students: 60, 
      status: 'Active',
      stream: 'Information Technology',
      semester: 'Semester 2',
      credits: 3,
      description: 'Development of mobile applications for iOS and Android platforms using modern frameworks.',
      learningOutcomes: [
        'Develop cross-platform mobile apps',
        'Implement mobile UI/UX principles',
        'Integrate with mobile device features',
        'Publish apps to app stores'
      ],
      modules: 5,
      enrolledStudents: 60,
      maxCapacity: 65,
      startDate: '2025-08-15',
      endDate: '2025-12-20',
      reports: [
        { id: 1, week: 1, date: '2025-08-20', topics: 'Mobile Development Intro', attendance: '25/25', status: 'Submitted' }
      ],
      lectures: [
        { id: 1, topic: 'Mobile Development Intro', date: '2025-08-20', completed: true },
        { id: 2, topic: 'React Native Basics', date: '2025-08-27', completed: true },
        { id: 3, topic: 'Mobile UI Design', date: '2025-09-03', completed: false }
      ]
    }
  ]);

  // Filter courses to only show those in the principal lecturer's stream
  const streamCourses = courses.filter(course => course.stream === currentPrincipalStream);

  // Filter courses based on search term and status within the principal's stream
  const filteredCourses = streamCourses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.lecturer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
    setShowDetailModal(true);
  };

  const handleViewLectures = (course) => {
    setSelectedCourse(course);
    // In a real app, this would navigate to lectures page or show lectures modal
    alert(`Viewing lectures for ${course.name}. This would show a detailed lectures view in a real application.`);
  };

  const handleViewReports = (course) => {
    setSelectedCourse(course);
    // In a real app, this would navigate to reports page
    alert(`Viewing reports for ${course.name}. This would show all lecture reports in a real application.`);
  };

  const handleStatusToggle = (courseId) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, status: course.status === 'Active' ? 'Inactive' : 'Active' }
        : course
    ));
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilterStatus('all');
  };

  const getCapacityPercentage = (course) => {
    return Math.round((course.enrolledStudents / course.maxCapacity) * 100);
  };

  const getCapacityVariant = (percentage) => {
    if (percentage >= 90) return 'danger';
    if (percentage >= 75) return 'warning';
    return 'success';
  };

  const getReportStatusVariant = (status) => {
    switch (status) {
      case 'Submitted': return 'success';
      case 'Pending': return 'warning';
      case 'Overdue': return 'danger';
      default: return 'secondary';
    }
  };

  // Calculate statistics for the current stream
  const streamStats = {
    totalCourses: streamCourses.length,
    totalStudents: streamCourses.reduce((sum, c) => sum + c.students, 0),
    activeCourses: streamCourses.filter(c => c.status === 'Active').length,
    totalLecturers: new Set(streamCourses.map(c => c.lecturer)).size,
    totalReports: streamCourses.reduce((sum, c) => sum + c.reports.length, 0),
    nearCapacity: streamCourses.filter(c => getCapacityPercentage(c) >= 90).length
  };

  return (
    <>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-0">Courses Under My Stream: {currentPrincipalStream}</h5>
            <small className="text-muted">Manage and monitor courses in your assigned stream</small>
          </div>
          <div className="d-flex align-items-center gap-2">
            {/* Status Filter */}
            <Form.Select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ width: '150px' }}
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>

            {/* Search Input */}
            <InputGroup style={{ width: '350px' }}>
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
          {/* Stream Overview Banner */}
          <div className="mb-4 p-3 bg-primary text-white rounded">
            <Row className="align-items-center">
              <Col md={8}>
                <h4 className="mb-1">{currentPrincipalStream} Stream Overview</h4>
                <p className="mb-0">
                  Managing {streamStats.totalCourses} courses with {streamStats.totalStudents} students across {streamStats.totalLecturers} lecturers
                </p>
              </Col>
              <Col md={4} className="text-end">
                <Badge bg="light" text="dark" className="fs-6">
                  {streamStats.activeCourses} Active • {streamStats.totalCourses - streamStats.activeCourses} Inactive
                </Badge>
              </Col>
            </Row>
          </div>

          {/* Search Results Summary */}
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <div>
              <span className="text-muted">
                Showing {filteredCourses.length} of {streamCourses.length} courses in your stream
                {searchTerm && (
                  <span> for "<strong>{searchTerm}</strong>"</span>
                )}
                {filterStatus !== 'all' && (
                  <span> - <Badge bg="info">{filterStatus}</Badge></span>
                )}
              </span>
            </div>
            <div>
              <Badge bg="success" className="me-2">
                Active: {streamCourses.filter(c => c.status === 'Active').length}
              </Badge>
              <Badge bg="secondary">
                Inactive: {streamCourses.filter(c => c.status === 'Inactive').length}
              </Badge>
            </div>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-folder-x text-muted" style={{ fontSize: '3rem' }}></i>
              <h5 className="mt-3">No courses found in your stream</h5>
              <p className="text-muted">
                {searchTerm ? `No courses match "${searchTerm}" in ${currentPrincipalStream} stream` : `No courses available in ${currentPrincipalStream} stream`}
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
                  <th>Course Name</th>
                  <th>Code</th>
                  <th>Lecturer</th>
                  <th>Students</th>
                  <th>Reports</th>
                  <th>Capacity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map(course => (
                  <tr key={course.id}>
                    <td>
                      <div>
                        <strong>{course.name}</strong>
                        <br />
                        <small className="text-muted">{course.semester} • {course.credits} credits</small>
                      </div>
                    </td>
                    <td>
                      <Badge bg="secondary">{course.code}</Badge>
                    </td>
                    <td>
                      <div>
                        <strong>{course.lecturer}</strong>
                        <br />
                        <small className="text-muted">{course.lecturerEmail}</small>
                      </div>
                    </td>
                    <td>
                      <Badge bg="primary">{course.students} students</Badge>
                    </td>
                    <td>
                      <div>
                        <Badge bg={course.reports.length > 0 ? 'info' : 'secondary'}>
                          {course.reports.length} reports
                        </Badge>
                        <br />
                        <small className="text-muted">
                          Last: {course.reports.length > 0 ? course.reports[course.reports.length - 1].date : 'No reports'}
                        </small>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div style={{ width: '60px' }} className="me-2">
                          {getCapacityPercentage(course)}%
                        </div>
                        <div style={{ width: '100px' }}>
                          <div 
                            className="progress" 
                            style={{ height: '8px' }}
                            title={`${course.enrolledStudents}/${course.maxCapacity} students`}
                          >
                            <div 
                              className={`progress-bar bg-${getCapacityVariant(getCapacityPercentage(course))}`}
                              style={{ width: `${getCapacityPercentage(course)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Badge bg={course.status === 'Active' ? 'success' : 'secondary'}>
                          {course.status}
                        </Badge>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="ms-2 p-0"
                          onClick={() => handleStatusToggle(course.id)}
                          title={course.status === 'Active' ? 'Deactivate' : 'Activate'}
                        >
                          <i className={`bi bi-toggle-${course.status === 'Active' ? 'on' : 'off'} text-${course.status === 'Active' ? 'success' : 'secondary'}`}></i>
                        </Button>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          onClick={() => handleViewDetails(course)}
                          title="View Course Details"
                        >
                          <i className="bi bi-eye"></i> Details
                        </Button>
                        <Button 
                          variant="outline-info" 
                          size="sm"
                          onClick={() => handleViewLectures(course)}
                          title="View Lectures"
                        >
                          <i className="bi bi-list-check"></i> Lectures
                        </Button>
                        <Button 
                          variant="outline-success" 
                          size="sm"
                          onClick={() => handleViewReports(course)}
                          title="View Reports"
                        >
                          <i className="bi bi-file-text"></i> Reports
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {/* Summary Statistics for Current Stream */}
          <div className="mt-3 p-3 bg-light rounded">
            <Row className="text-center">
              <Col md={2}>
                <div className="border-end">
                  <h4 className="text-primary mb-0">{streamStats.totalCourses}</h4>
                  <small className="text-muted">Total Courses</small>
                </div>
              </Col>
              <Col md={2}>
                <div className="border-end">
                  <h4 className="text-success mb-0">{streamStats.totalStudents}</h4>
                  <small className="text-muted">Total Students</small>
                </div>
              </Col>
              <Col md={2}>
                <div className="border-end">
                  <h4 className="text-warning mb-0">{streamStats.nearCapacity}</h4>
                  <small className="text-muted">Near Capacity</small>
                </div>
              </Col>
              <Col md={2}>
                <div className="border-end">
                  <h4 className="text-info mb-0">{streamStats.totalLecturers}</h4>
                  <small className="text-muted">Lecturers</small>
                </div>
              </Col>
              <Col md={2}>
                <div className="border-end">
                  <h4 className="text-secondary mb-0">{streamStats.totalReports}</h4>
                  <small className="text-muted">Total Reports</small>
                </div>
              </Col>
              <Col md={2}>
                <div>
                  <h4 className="text-danger mb-0">
                    {streamCourses.filter(c => c.reports.length === 0).length}
                  </h4>
                  <small className="text-muted">No Reports</small>
                </div>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>

      {/* Course Details Modal */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-info-circle me-2"></i>
            Course Details: {selectedCourse?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCourse && (
            <div>
              {/* Basic Information */}
              <Row className="mb-4">
                <Col md={6}>
                  <h6>Course Information</h6>
                  <Table bordered size="sm">
                    <tbody>
                      <tr>
                        <td><strong>Course Code:</strong></td>
                        <td>{selectedCourse.code}</td>
                      </tr>
                      <tr>
                        <td><strong>Stream:</strong></td>
                        <td>
                          <Badge bg="info">{selectedCourse.stream}</Badge>
                        </td>
                      </tr>
                      <tr>
                        <td><strong>Semester:</strong></td>
                        <td>{selectedCourse.semester}</td>
                      </tr>
                      <tr>
                        <td><strong>Credits:</strong></td>
                        <td>{selectedCourse.credits}</td>
                      </tr>
                      <tr>
                        <td><strong>Status:</strong></td>
                        <td>
                          <Badge bg={selectedCourse.status === 'Active' ? 'success' : 'secondary'}>
                            {selectedCourse.status}
                          </Badge>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col md={6}>
                  <h6>Enrollment Information</h6>
                  <Table bordered size="sm">
                    <tbody>
                      <tr>
                        <td><strong>Enrolled Students:</strong></td>
                        <td>{selectedCourse.enrolledStudents}</td>
                      </tr>
                      <tr>
                        <td><strong>Maximum Capacity:</strong></td>
                        <td>{selectedCourse.maxCapacity}</td>
                      </tr>
                      <tr>
                        <td><strong>Capacity Usage:</strong></td>
                        <td>
                          <Badge bg={getCapacityVariant(getCapacityPercentage(selectedCourse))}>
                            {getCapacityPercentage(selectedCourse)}%
                          </Badge>
                        </td>
                      </tr>
                      <tr>
                        <td><strong>Start Date:</strong></td>
                        <td>{selectedCourse.startDate}</td>
                      </tr>
                      <tr>
                        <td><strong>End Date:</strong></td>
                        <td>{selectedCourse.endDate}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>

              {/* Lecturer Information */}
              <Row className="mb-4">
                <Col>
                  <h6>Lecturer Information</h6>
                  <Card>
                    <Card.Body>
                      <Row>
                        <Col md={4}>
                          <strong>Name:</strong> {selectedCourse.lecturer}
                        </Col>
                        <Col md={4}>
                          <strong>Email:</strong> {selectedCourse.lecturerEmail}
                        </Col>
                        <Col md={4}>
                          <strong>Phone:</strong> {selectedCourse.lecturerPhone}
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Course Description */}
              <Row className="mb-4">
                <Col>
                  <h6>Course Description</h6>
                  <Card>
                    <Card.Body>
                      <p>{selectedCourse.description}</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Learning Outcomes */}
              <Row className="mb-4">
                <Col>
                  <h6>Learning Outcomes</h6>
                  <Card>
                    <Card.Body>
                      <ul>
                        {selectedCourse.learningOutcomes.map((outcome, index) => (
                          <li key={index}>{outcome}</li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Reports Summary */}
              <Row className="mb-4">
                <Col>
                  <h6>Lecture Reports ({selectedCourse.reports.length} submitted)</h6>
                  {selectedCourse.reports.length > 0 ? (
                    <Table striped bordered size="sm">
                      <thead>
                        <tr>
                          <th>Week</th>
                          <th>Date</th>
                          <th>Topics Covered</th>
                          <th>Attendance</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedCourse.reports.map(report => (
                          <tr key={report.id}>
                            <td>Week {report.week}</td>
                            <td>{report.date}</td>
                            <td>{report.topics}</td>
                            <td>{report.attendance}</td>
                            <td>
                              <Badge bg={getReportStatusVariant(report.status)}>
                                {report.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <Alert variant="info">
                      No reports submitted yet for this course.
                    </Alert>
                  )}
                </Col>
              </Row>

              {/* Lecture Schedule */}
              <Row>
                <Col>
                  <h6>Lecture Schedule ({selectedCourse.lectures.length} sessions)</h6>
                  {selectedCourse.lectures.length > 0 ? (
                    <Table striped bordered size="sm">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Topic</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedCourse.lectures.map(lecture => (
                          <tr key={lecture.id}>
                            <td>{lecture.id}</td>
                            <td>{lecture.topic}</td>
                            <td>{lecture.date}</td>
                            <td>
                              <Badge bg={lecture.completed ? 'success' : 'warning'}>
                                {lecture.completed ? 'Completed' : 'Upcoming'}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <Alert variant="info">
                      No lectures scheduled yet for this course.
                    </Alert>
                  )}
                </Col>
              </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Close
          </Button>
          <Button variant="info" onClick={() => handleViewLectures(selectedCourse)}>
            <i className="bi bi-list-check me-2"></i>
            View All Lectures
          </Button>
          <Button variant="success" onClick={() => handleViewReports(selectedCourse)}>
            <i className="bi bi-file-text me-2"></i>
            View All Reports
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Courses;