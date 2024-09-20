import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export const DeleteModal = ({ deleteAction, student }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleDelete = () => {
    deleteAction(student.id);
    handleClose();
  };

  return (
    <>
      <Button variant='light' onClick={handleShow}>
        <i className='nf nf-fa-trash'></i>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure want to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const EditModal = ({ editAction, student }) => {
  const [show, setShow] = useState(false);
  const [editStudent, setEditStudent] = useState(student);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleEdit = () => {
    editAction(editStudent);
    handleClose();
  };

  const onChange = e => {
    const { name, value } = e.target;
    setEditStudent(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Button variant='light' onClick={handleShow}>
        <i className='nf nf-fa-edit'></i>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editing...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                value={editStudent.name}
                name='name'
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='phone'>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type='text'
                name='phone'
                value={editStudent.phone}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                name='email'
                value={editStudent.email}
                onChange={onChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleEdit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const AddModal = ({ addAction }) => {
  const [show, setShow] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = () => {
    // console.log(e.target);
    addAction(newStudent);
    handleClose();
  };

  const onChange = e => {
    const { name, value } = e.target;
    setNewStudent(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Add new
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                value={newStudent.name}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='phone'>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type='text'
                name='phone'
                value={newStudent.phone}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                name='email'
                value={newStudent.email}
                onChange={onChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleAdd}>
            Add new
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
