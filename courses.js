import React, { useState } from 'react';
import { Card, Table, Button, Form, Modal, Row, Col, Alert } from 'react-bootstrap';

const Courses = () => {
  const [showModal, setShowModal] = useState(false);
  const [courses, setCourses] = useState([
    { id: 1, name: 'Web Development', code: 'DIWA2110', lecturer: 'Dr.Pekosela', modules: 5, status: 'Active' },
    { id: 2, name: 'Database Systems', code: 'DBS2110', lecturer: 'Prof. Morie', modules: 6, status: 'Active' },
    { id: 3, name: 'Network Security', code: 'NTS2110', lecturer: 'Not Assigned', modules: 0, status: 'Draft' }
  ]);

  const [newCourse, setNewCourse] = useState({
    name: '',
    code: '',
    lecturer: '',
    modules: ''
  });

  const handleAddCourse = () => {
    const course = {
      id: courses.length + 1,
      ...newCourse,
      modules: parseInt(newCourse.modules) || 0,
      status: 'Draft'
    };
    setCourses([...courses, course]);
    setShowModal(false);
    setNewCourse({ name: '', code: '', lecturer: '', modules: '' });
  };

  return (
    <>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Program Courses</h5>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add New Course
          </Button>
        </Card.Header>
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Code</th>
                <th>Lecturer</th>
                <th>Modules</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id}>
                  <td>
                    <strong>{course.name}</strong>
                  </td>
                  <td>{course.code}</td>
                  <td>{course.lecturer}</td>
                  <td>{course.modules}</td>
                  <td>
                    <span className={`badge bg-${course.status === 'Active' ? 'success' : 'secondary'}`}>
                      {course.status}
                    </span>
                  </td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      Assign Lecturer
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      Edit Modules
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Course Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                  placeholder="Enter course name"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Course Code</Form.Label>
                <Form.Control
                  type="text"
                  value={newCourse.code}
                  onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
                  placeholder="Enter course code"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Lecturer</Form.Label>
                <Form.Control
                  type="text"
                  value={newCourse.lecturer}
                  onChange={(e) => setNewCourse({...newCourse, lecturer: e.target.value})}
                  placeholder="Assign lecturer"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Number of Modules</Form.Label>
                <Form.Control
                  type="number"
                  value={newCourse.modules}
                  onChange={(e) => setNewCourse({...newCourse, modules: e.target.value})}
                  placeholder="Enter number of modules"
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddCourse}>
            Add Course
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Courses;