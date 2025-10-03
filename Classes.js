import React, { useState } from 'react';
import { Card, Table, Badge, Button, Form, Modal, Row, Col, Alert, InputGroup } from 'react-bootstrap';

const Classes = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [classes, setClasses] = useState([
    { 
      id: 1, 
      name: 'IT Year 1 Group A', 
      course: 'Web Development', 
      courseCode: 'DIWA2110',
      students: 25, 
      schedule: 'Mon 10:00 AM',
      venue: 'Room 101',
      lecturer: 'Dr. Pekosela',
      status: 'Active'
    },
    { 
      id: 2, 
      name: 'BIT Year 2 Group B', 
      course: 'Database Systems', 
      courseCode: 'DBS2110',
      students: 30, 
      schedule: 'Tue 2:00 PM',
      venue: 'Lab A',
      lecturer: 'Prof. Morie',
      status: 'Active'
    },
    { 
      id: 3, 
      name: 'IT Year 3 Group C', 
      course: 'Network Security', 
      courseCode: 'NTS2110',
      students: 22, 
      schedule: 'Wed 9:00 AM',
      venue: 'Room 205',
      lecturer: 'Dr.Maliehe',
      status: 'Inactive'
    }
  ]);

  const [newClass, setNewClass] = useState({
    name: '',
    course: '',
    courseCode: '',
    students: '',
    schedule: '',
    venue: '',
    lecturer: '',
    status: 'Active'
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Filter classes based on search term
  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClass = () => {
    setEditingClass(null);
    setNewClass({
      name: '',
      course: '',
      courseCode: '',
      students: '',
      schedule: '',
      venue: '',
      lecturer: '',
      status: 'Active'
    });
    setShowModal(true);
  };

  const handleEditClass = (cls) => {
    setEditingClass(cls);
    setNewClass({ ...cls });
    setShowModal(true);
  };

  const handleSaveClass = () => {
    if (!newClass.name || !newClass.course || !newClass.courseCode || !newClass.students) {
      alert('Please fill in all required fields (Name, Course, Course Code, Students)');
      return;
    }

    if (editingClass) {
      // Update existing class
      setClasses(prev => prev.map(cls => 
        cls.id === editingClass.id ? { ...newClass, id: editingClass.id } : cls
      ));
      setSuccessMessage(`Class "${newClass.name}" updated successfully!`);
    } else {
      // Add new class
      const newClassWithId = {
        ...newClass,
        id: Math.max(...classes.map(c => c.id)) + 1
      };
      setClasses(prev => [...prev, newClassWithId]);
      setSuccessMessage(`Class "${newClass.name}" added successfully!`);
    }

    setShowSuccess(true);
    setShowModal(false);
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setSuccessMessage('');
    }, 3000);
  };

  const handleDeleteClass = (classId) => {
    if (window.confirm('Are you sure you want to delete this class? This action cannot be undone.')) {
      setClasses(prev => prev.filter(cls => cls.id !== classId));
      setSuccessMessage('Class deleted successfully!');
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        setSuccessMessage('');
      }, 3000);
    }
  };

  const handleStatusToggle = (classId) => {
    setClasses(prev => prev.map(cls => 
      cls.id === classId 
        ? { ...cls, status: cls.status === 'Active' ? 'Inactive' : 'Active' }
        : cls
    ));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-0">My Classes</h5>
            <small className="text-muted">Manage your assigned classes</small>
          </div>
          <div className="d-flex gap-2">
            <InputGroup style={{ width: '300px' }}>
              <Form.Control 
                placeholder="Search classes..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-secondary">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
            <Button variant="primary" onClick={handleAddClass}>
              <i className="bi bi-plus-circle me-2"></i>
              Add New Class
            </Button>
          </div>
        </Card.Header>
        
        <Card.Body>
          {showSuccess && (
            <Alert variant="success" className="d-flex align-items-center">
              <i className="bi bi-check-circle-fill me-2"></i>
              {successMessage}
            </Alert>
          )}

          {filteredClasses.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-folder-x text-muted" style={{ fontSize: '3rem' }}></i>
              <h5 className="mt-3">No classes found</h5>
              <p className="text-muted">
                {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first class'}
              </p>
              {!searchTerm && (
                <Button variant="primary" onClick={handleAddClass}>
                  <i className="bi bi-plus-circle me-2"></i>
                  Add Your First Class
                </Button>
              )}
            </div>
          ) : (
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>Class Name</th>
                  <th>Course</th>
                  <th>Code</th>
                  <th>Students</th>
                  <th>Schedule</th>
                  <th>Venue</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClasses.map(cls => (
                  <tr key={cls.id}>
                    <td>
                      <div>
                        <strong>{cls.name}</strong>
                        <br />
                        <small className="text-muted">Lecturer: {cls.lecturer}</small>
                      </div>
                    </td>
                    <td>{cls.course}</td>
                    <td>
                      <Badge bg="secondary">{cls.courseCode}</Badge>
                    </td>
                    <td>
                      <Badge bg="info">{cls.students} students</Badge>
                    </td>
                    <td>{cls.schedule}</td>
                    <td>{cls.venue}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Badge bg={cls.status === 'Active' ? 'success' : 'secondary'}>
                          {cls.status}
                        </Badge>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="ms-2 p-0"
                          onClick={() => handleStatusToggle(cls.id)}
                          title={cls.status === 'Active' ? 'Deactivate' : 'Activate'}
                        >
                          <i className={`bi bi-toggle-${cls.status === 'Active' ? 'on' : 'off'} text-${cls.status === 'Active' ? 'success' : 'secondary'}`}></i>
                        </Button>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          onClick={() => handleEditClass(cls)}
                          title="Edit Class"
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button 
                          variant="outline-info" 
                          size="sm"
                          title="View Details"
                        >
                          <i className="bi bi-eye"></i>
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDeleteClass(cls.id)}
                          title="Delete Class"
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {/* Summary Statistics */}
          <div className="mt-3 p-3 bg-light rounded">
            <Row className="text-center">
              <Col md={3}>
                <div className="border-end">
                  <h4 className="text-primary mb-0">{classes.length}</h4>
                  <small className="text-muted">Total Classes</small>
                </div>
              </Col>
              <Col md={3}>
                <div className="border-end">
                  <h4 className="text-success mb-0">{classes.filter(c => c.status === 'Active').length}</h4>
                  <small className="text-muted">Active Classes</small>
                </div>
              </Col>
              <Col md={3}>
                <div className="border-end">
                  <h4 className="text-secondary mb-0">{classes.filter(c => c.status === 'Inactive').length}</h4>
                  <small className="text-muted">Inactive Classes</small>
                </div>
              </Col>
              <Col md={3}>
                <div>
                  <h4 className="text-info mb-0">{classes.reduce((sum, c) => sum + parseInt(c.students), 0)}</h4>
                  <small className="text-muted">Total Students</small>
                </div>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>

      {/* Add/Edit Class Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-book me-2"></i>
            {editingClass ? 'Edit Class' : 'Add New Class'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Class Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={newClass.name}
                    onChange={handleInputChange}
                    placeholder="e.g., IT Year 1 Group A"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Course Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="course"
                    value={newClass.course}
                    onChange={handleInputChange}
                    placeholder="e.g., Web Development"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Course Code *</Form.Label>
                  <Form.Control
                    type="text"
                    name="courseCode"
                    value={newClass.courseCode}
                    onChange={handleInputChange}
                    placeholder="e.g., DIWA2110"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Number of Students *</Form.Label>
                  <Form.Control
                    type="number"
                    name="students"
                    value={newClass.students}
                    onChange={handleInputChange}
                    placeholder="e.g., 25"
                    min="1"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Schedule *</Form.Label>
                  <Form.Control
                    type="text"
                    name="schedule"
                    value={newClass.schedule}
                    onChange={handleInputChange}
                    placeholder="e.g., Mon 10:00 AM"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Venue *</Form.Label>
                  <Form.Control
                    type="text"
                    name="venue"
                    value={newClass.venue}
                    onChange={handleInputChange}
                    placeholder="e.g., Room 101"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Lecturer Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="lecturer"
                    value={newClass.lecturer}
                    onChange={handleInputChange}
                    placeholder="e.g., Dr.Pekosela"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={newClass.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveClass}>
            <i className="bi bi-check-circle me-2"></i>
            {editingClass ? 'Update Class' : 'Add Class'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Classes;