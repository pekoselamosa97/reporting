import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';

const ReportingForm = () => {
  const [formData, setFormData] = useState({
    facultyName: 'Faculty of Information Communication Technology',
    className: '',
    weekOfReporting: '',
    dateOfLecture: '',
    courseName: '',
    courseCode: '',
    lecturerName: '',
    actualStudentsPresent: '',
    totalRegisteredStudents: '',
    venue: '',
    scheduledTime: '',
    topicTaught: '',
    learningOutcomes: '',
    recommendations: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">Lecturer Reporting Form</h5>
      </Card.Header>
      <Card.Body>
        {showSuccess && (
          <Alert variant="success" className="d-flex align-items-center">
            <i className="bi bi-check-circle-fill me-2"></i>
            Report submitted successfully!
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Faculty Name</Form.Label>
                <Form.Control
                  type="text"
                  name="facultyName"
                  value={formData.facultyName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Class Name</Form.Label>
                <Form.Control
                  type="text"
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  placeholder="e.g., IT Year 1 Group A"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Week of Reporting</Form.Label>
                <Form.Control
                  type="number"
                  name="weekOfReporting"
                  value={formData.weekOfReporting}
                  onChange={handleChange}
                  min="1"
                  max="52"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date of Lecture</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfLecture"
                  value={formData.dateOfLecture}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Course Name</Form.Label>
                <Form.Control
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  placeholder="e.g., Web Application Development"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Course Code</Form.Label>
                <Form.Control
                  type="text"
                  name="courseCode"
                  value={formData.courseCode}
                  onChange={handleChange}
                  placeholder="e.g., DIWA2110"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Lecturer's Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lecturerName"
                  value={formData.lecturerName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Students Present</Form.Label>
                <Form.Control
                  type="number"
                  name="actualStudentsPresent"
                  value={formData.actualStudentsPresent}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Total Registered</Form.Label>
                <Form.Control
                  type="number"
                  name="totalRegisteredStudents"
                  value={formData.totalRegisteredStudents}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Venue</Form.Label>
                <Form.Control
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="e.g., Room 101, Lab A"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Scheduled Time</Form.Label>
                <Form.Control
                  type="time"
                  name="scheduledTime"
                  value={formData.scheduledTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Topic Taught</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="topicTaught"
              value={formData.topicTaught}
              onChange={handleChange}
              placeholder="Describe the topic covered in this lecture..."
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Learning Outcomes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="learningOutcomes"
              value={formData.learningOutcomes}
              onChange={handleChange}
              placeholder="What should students have learned from this topic?"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Lecturer's Recommendations</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="recommendations"
              value={formData.recommendations}
              onChange={handleChange}
              placeholder="Any recommendations for improvement or follow-up actions..."
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" size="lg">
              Submit Report
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ReportingForm;