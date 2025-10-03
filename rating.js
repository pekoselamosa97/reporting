import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert, Badge } from 'react-bootstrap';

const Rating = () => {
  const [submitted, setSubmitted] = useState(false);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionHistory, setSubmissionHistory] = useState({});

  // Mock data for courses that can be rated
  const courses = [
    { 
      id: 1, 
      name: 'Web Development', 
      code: 'DIWA2110', 
      lecturer: 'Dr. Pekosela',
      description: 'Learn modern web development technologies and frameworks'
    },
    { 
      id: 2, 
      name: 'Database Systems', 
      code: 'DBS2110', 
      lecturer: 'Prof.Morie',
      description: 'Understanding database design, SQL, and data management'
    },
    { 
      id: 3, 
      name: 'Network Security', 
      code: 'NTS2110', 
      lecturer: 'Dr.Maliehe',
      description: 'Fundamentals of network security and cybersecurity principles'
    }
  ];

  const handleRatingChange = (courseId, value) => {
    setRatings(prev => ({
      ...prev,
      [courseId]: parseInt(value)
    }));
  };

  const handleCommentChange = (courseId, comment) => {
    setComments(prev => ({
      ...prev,
      [courseId]: comment
    }));
  };

  const handleSingleSubmit = async (courseId) => {
    setIsSubmitting(true);

    try {
      // Validate that this course has a rating
      if (!ratings[courseId]) {
        alert('Please provide a rating for this course before submitting.');
        setIsSubmitting(false);
        return;
      }

      const course = courses.find(c => c.id === courseId);
      const submissionData = {
        courseId: course.id,
        courseName: course.name,
        courseCode: course.code,
        lecturer: course.lecturer,
        rating: ratings[courseId],
        comments: comments[courseId] || 'No comments provided',
        submissionDate: new Date().toLocaleDateString(),
        submissionTime: new Date().toLocaleTimeString(),
        timestamp: new Date().toISOString(),
        studentId: 'STU001',
        studentName: 'Current Student'
      };

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Log the submission
      console.log('✅ Rating Submitted for:', course.name);
      console.log('⭐ New Rating:', submissionData.rating + '/5');
      if (submissionHistory[courseId]) {
        console.log('🔄 Previous Rating:', submissionHistory[courseId].rating + '/5');
      }
      console.log('💬 Feedback:', submissionData.comments);

      // Update submission history (overwrite previous rating)
      setSubmissionHistory(prev => ({
        ...prev,
        [courseId]: submissionData
      }));

      // Show success message
      setSubmitted(courseId);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitted(null);
      }, 3000);

      setIsSubmitting(false);

    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('There was an error submitting your rating. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleSubmitAll = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get courses that have ratings
      const coursesToSubmit = courses.filter(course => ratings[course.id]);

      if (coursesToSubmit.length === 0) {
        alert('Please rate at least one course before submitting.');
        setIsSubmitting(false);
        return;
      }

      // Prepare submission data for all rated courses
      const submissionData = coursesToSubmit.map(course => ({
        courseId: course.id,
        courseName: course.name,
        courseCode: course.code,
        lecturer: course.lecturer,
        rating: ratings[course.id],
        comments: comments[course.id] || 'No comments provided',
        submissionDate: new Date().toLocaleDateString(),
        submissionTime: new Date().toLocaleTimeString(),
        timestamp: new Date().toISOString(),
        studentId: 'STU001',
        studentName: 'Current Student'
      }));

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Update submission history for all rated courses
      const newHistory = { ...submissionHistory };
      submissionData.forEach(item => {
        newHistory[item.courseId] = item;
      });
      setSubmissionHistory(newHistory);

      // Show success message
      setSubmitted('all');

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitted(null);
      }, 3000);

      setIsSubmitting(false);

    } catch (error) {
      console.error('Error submitting ratings:', error);
      alert('There was an error submitting your ratings. Please try again.');
      setIsSubmitting(false);
    }
  };

  const getRatingDescription = (rating) => {
    const descriptions = {
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent'
    };
    return descriptions[rating] || '';
  };

  const getRatedCount = () => {
    return courses.filter(course => ratings[course.id]).length;
  };

  const getSubmittedCount = () => {
    return Object.keys(submissionHistory).length;
  };

  const hasCurrentRating = (courseId) => {
    return !!ratings[courseId];
  };

  const hasPreviousRating = (courseId) => {
    return !!submissionHistory[courseId];
  };

  const getPreviousRating = (courseId) => {
    return submissionHistory[courseId];
  };

  const canSubmitAny = () => {
    return courses.some(course => ratings[course.id]);
  };

  const isNewRatingDifferent = (courseId) => {
    if (!hasPreviousRating(courseId) || !hasCurrentRating(courseId)) return true;
    return ratings[courseId] !== submissionHistory[courseId].rating || 
           comments[courseId] !== submissionHistory[courseId].comments;
  };

  return (
    <Card>
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">
          <i className="bi bi-arrow-repeat me-2"></i>
          Course Rating & Feedback
        </h5>
        <small>Rate courses multiple times - your latest rating will be saved</small>
      </Card.Header>
      
      <Card.Body>
        {/* Summary Stats */}
        <div className="mb-4 p-3 bg-light rounded">
          <Row className="text-center">
            <Col md={3}>
              <div className="border-end">
                <h4 className="text-primary mb-0">{courses.length}</h4>
                <small className="text-muted">Total Courses</small>
              </div>
            </Col>
            <Col md={3}>
              <div className="border-end">
                <h4 className="text-warning mb-0">{getRatedCount()}</h4>
                <small className="text-muted">Rated Now</small>
              </div>
            </Col>
            <Col md={3}>
              <div className="border-end">
                <h4 className="text-info mb-0">{getSubmittedCount()}</h4>
                <small className="text-muted">Previously Rated</small>
              </div>
            </Col>
            <Col md={3}>
              <div>
                <h4 className="text-success mb-0">
                  {courses.filter(course => isNewRatingDifferent(course.id)).length}
                </h4>
                <small className="text-muted">Updated Ratings</small>
              </div>
            </Col>
          </Row>
        </div>

        {/* Success Messages */}
        {submitted === 'all' && (
          <Alert variant="success" className="d-flex align-items-center">
            <i className="bi bi-check-circle-fill me-2"></i>
            <div>
              <strong>All ratings submitted successfully! ✅</strong>
              <br />
              <small>Your latest feedback has been recorded and will update previous ratings.</small>
            </div>
          </Alert>
        )}

        {submitted && submitted !== 'all' && (
          <Alert variant="success" className="d-flex align-items-center">
            <i className="bi bi-check-circle-fill me-2"></i>
            <div>
              <strong>Rating updated successfully! 🔄</strong>
              <br />
              <small>Your new rating for {courses.find(c => c.id === submitted)?.name} has been saved.</small>
            </div>
          </Alert>
        )}

        {/* Instructions */}
        <div className="mb-4 p-3 bg-info bg-opacity-10 rounded">
          <h6>
            <i className="bi bi-arrow-repeat me-2"></i>
            Re-rating is Allowed!
          </h6>
          <ul className="mb-0 small">
            <li><strong>Change your mind?</strong> Update your rating anytime</li>
            <li><strong>New feedback?</strong> Submit updated comments</li>
            <li><strong>Only your latest rating</strong> will be kept</li>
            <li>Previous ratings are <strong>automatically overwritten</strong></li>
          </ul>
        </div>

        <Form onSubmit={handleSubmitAll}>
          {courses.map(course => (
            <Card key={course.id} className="mb-4">
              <Card.Header className={
                hasPreviousRating(course.id) 
                  ? 'bg-info text-white' 
                  : hasCurrentRating(course.id) 
                    ? 'bg-warning bg-opacity-25' 
                    : 'bg-light'
              }>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-0">
                      {course.name} ({course.code})
                      {hasPreviousRating(course.id) && (
                        <Badge bg="light" text="info" className="ms-2">
                          <i className="bi bi-clock-history me-1"></i>
                          Previously Rated
                        </Badge>
                      )}
                    </h6>
                    <small>Lecturer: {course.lecturer}</small>
                  </div>
                  {hasCurrentRating(course.id) && isNewRatingDifferent(course.id) && (
                    <Badge bg="success">
                      <i className="bi bi-arrow-up me-1"></i>
                      Update Ready
                    </Badge>
                  )}
                </div>
              </Card.Header>
              <Card.Body>
                <p className="text-muted small mb-3">{course.description}</p>
                
                {/* Previous Rating Display */}
                {hasPreviousRating(course.id) && (
                  <Alert variant="info" className="small">
                    <i className="bi bi-info-circle me-2"></i>
                    <strong>Your previous rating:</strong> {getPreviousRating(course.id).rating}/5 stars
                    {getPreviousRating(course.id).comments !== 'No comments provided' && (
                      <> - "{getPreviousRating(course.id).comments}"</>
                    )}
                    <br />
                    <small>Submitted on {getPreviousRating(course.id).submissionDate}</small>
                  </Alert>
                )}

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <strong>
                          {hasPreviousRating(course.id) ? 'Update your rating' : 'Rate this course'} (1-5 stars)
                        </strong>
                      </Form.Label>
                      <div className="d-flex flex-wrap gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Form.Check
                            key={star}
                            type="radio"
                            name={`rating-${course.id}`}
                            value={star}
                            id={`rating-${course.id}-${star}`}
                            label={
                              <div className="text-center p-2 border rounded">
                                <span className="text-warning fs-4 d-block">{'★'.repeat(star)}</span>
                                <small>{star} - {getRatingDescription(star)}</small>
                              </div>
                            }
                            onChange={(e) => handleRatingChange(course.id, e.target.value)}
                            disabled={isSubmitting}
                            checked={ratings[course.id] === star}
                            className="rating-option"
                          />
                        ))}
                      </div>
                      
                      {/* Current Selection Display */}
                      {hasCurrentRating(course.id) && (
                        <div className="mt-2 p-2 bg-primary bg-opacity-10 rounded">
                          <small>
                            <i className="bi bi-star me-1"></i>
                            <strong>Currently selected:</strong> {ratings[course.id]} stars - {getRatingDescription(ratings[course.id])}
                            {hasPreviousRating(course.id) && ratings[course.id] === getPreviousRating(course.id).rating && (
                              <Badge bg="secondary" className="ms-2">Same as previous</Badge>
                            )}
                            {hasPreviousRating(course.id) && ratings[course.id] !== getPreviousRating(course.id).rating && (
                              <Badge bg="warning" className="ms-2">
                                {ratings[course.id] > getPreviousRating(course.id).rating ? '↑ Increased' : '↓ Decreased'}
                              </Badge>
                            )}
                          </small>
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <strong>Your Feedback & Suggestions</strong>
                        <span className="text-muted"> (Optional)</span>
                      </Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3}
                        placeholder={
                          hasPreviousRating(course.id) 
                            ? `Update your feedback for ${course.name}...` 
                            : `What did you like about ${course.name}? Any suggestions?`
                        }
                        onChange={(e) => handleCommentChange(course.id, e.target.value)}
                        disabled={isSubmitting}
                        value={comments[course.id] || ''}
                      />
                      {hasPreviousRating(course.id) && comments[course.id] === getPreviousRating(course.id).comments && (
                        <Form.Text className="text-muted">
                          <i className="bi bi-info-circle me-1"></i>
                          Feedback same as previous submission
                        </Form.Text>
                      )}
                    </Form.Group>

                    {/* Individual Submit Button */}
                    {hasCurrentRating(course.id) && isNewRatingDifferent(course.id) && (
                      <div className="d-grid">
                        <Button 
                          variant="success"
                          onClick={() => handleSingleSubmit(course.id)}
                          disabled={isSubmitting}
                          size="sm"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Updating...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-arrow-repeat me-2"></i>
                              {hasPreviousRating(course.id) ? 'Update Rating' : 'Submit Rating'}
                            </>
                          )}
                        </Button>
                      </div>
                    )}

                    {hasPreviousRating(course.id) && (!hasCurrentRating(course.id) || !isNewRatingDifferent(course.id)) && (
                      <Alert variant="info" className="small mb-0">
                        <i className="bi bi-check-circle me-2"></i>
                        {hasCurrentRating(course.id) ? 'No changes detected' : 'Rating submitted - you can update it anytime'}
                      </Alert>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
          
          {/* Bulk Submit Button */}
          {canSubmitAny() && (
            <div className="d-grid gap-2 mt-4">
              <Button 
                type="submit"
                variant="primary"
                size="lg" 
                className="fw-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Submitting Ratings...
                  </>
                ) : (
                  <>
                    <i className="bi bi-send me-2"></i>
                    Submit All Current Ratings ({getRatedCount()} courses)
                  </>
                )}
              </Button>
              <div className="text-center text-muted small">
                <i className="bi bi-arrow-down me-1"></i>
                Submit all rated courses at once, or update individually above
              </div>
            </div>
          )}
        </Form>

        {/* Privacy Notice */}
        <div className="mt-4 p-3 bg-light rounded">
          <h6>
            <i className="bi bi-shield-check me-2"></i>
            Re-rating Policy
          </h6>
          <p className="small mb-0">
            You can update your ratings as many times as you want. Each new rating will overwrite the previous one. 
            This allows you to provide updated feedback based on your ongoing learning experience. Only your most 
            recent rating for each course will be considered in course evaluations.
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Rating;