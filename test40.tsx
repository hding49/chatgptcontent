import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface FeedbackModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (feedback: string) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ show, onHide, onSubmit }) => {
  const [feedbackText, setFeedbackText] = useState('');
  const maxCharacters = 2000; // 最大字符数限制

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 如果输入的字符数超过限制，截断文本
    const inputText = event.target.value.slice(0, maxCharacters);
    setFeedbackText(inputText);
  };

  const handleSubmit = () => {
    // 在此处执行提交逻辑，将 feedbackText 提交给服务器或其他处理方式
    onSubmit(feedbackText);

    // 清空输入框并关闭 Modal
    setFeedbackText('');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="feedbackForm">
            <Form.Label>Please enter your feedback (max {maxCharacters} characters):</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={feedbackText}
              onChange={handleInputChange}
              maxLength={maxCharacters} // 设置最大字符数限制
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FeedbackModal;


import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import FeedbackModal from './FeedbackModal'; // 请替换为实际的路径

const App: React.FC = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handleShowFeedbackModal = () => {
    setShowFeedbackModal(true);
  };

  const handleCloseFeedbackModal = () => {
    setShowFeedbackModal(false);
  };

  const handleFeedbackSubmit = (feedback: string) => {
    // 处理用户反馈，可以发送到服务器或执行其他操作
    console.log('User feedback:', feedback);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShowFeedbackModal}>
        Provide Feedback
      </Button>
      <FeedbackModal
        show={showFeedbackModal}
        onHide={handleCloseFeedbackModal}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
};

export default App;
