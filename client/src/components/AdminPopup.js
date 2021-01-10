import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import logger from '../utils/logger';


const AdminPopup = ({ show, setAdminPopupOpen, setIsAdmin, room }) => {
  const [adminPassword, setAdminPassword] = useState('');
  const [alertText, setAlertText] = useState('');

  // keep track of input component so we can focus on it
  const passwordInputRef = React.createRef();

  // on popup render, focus on name input component
  useEffect(() => {
    // eslint-disable-next-line react/no-find-dom-node
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [passwordInputRef]);

  const handleClose = () => {
    setAdminPassword('');
    setAlertText('');
    setAdminPopupOpen(false);
  };

  const submitAdminPassword = (e) => {
    e.preventDefault();
    // emitTryAdminStatus({ adminPassword, roomId: room.id }, (resData) => {
    //   logger.info('acknowledged from TRY ADMIN STATUS event', resData);

    //   if (!resData.error) {
    //     setIsAdmin(true);
    //     handleClose();
    //   } else {
    //     logger.error(resData.error);
    //     setAlertText('Password is incorrect! Please try again.');
    //   }
    // });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form onSubmit={submitAdminPassword}>
            <Form.Row className="mb-2">
              <Form.Label>Admin Password</Form.Label>
              <Form.Control
                ref={passwordInputRef}
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                type="password"
              />
            </Form.Row>
          </Form>
          <Form.Row className="justify-content-center">
            <Form.Text className="text-muted">
              {alertText}
            </Form.Text>
          </Form.Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitAdminPassword}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminPopup;