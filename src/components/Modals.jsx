import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import studentService from '../services/student';

const onChange = setFn => e => {
  const { name, value } = e.target;
  setFn(prevState => ({
    ...prevState,
    [name]: value,
  }));
};

export const RemoveModal = ({ handleOnRemove, student }) => {
  const [show, setShow] = useState(false);

  const onClickClose = () => {
    setShow(false);
  };
  const onClickShow = () => {
    setShow(true);
  };

  const onClickRemove = () => {
    studentService.remove(student.id).then(res => handleOnRemove(res.data.id));
    onClickClose();
  };

  return (
    <>
      <Button variant='light' onClick={onClickShow}>
        <i className='nf nf-fa-trash'></i>
      </Button>
      <Modal show={show} onHide={onClickClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure want to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant='secondary' onClick={onClickClose}>
            Cancel
          </Button>
          <Button variant='primary' onClick={onClickRemove}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const UpdateModal = ({ handleOnUpdate, student }) => {
  const [show, setShow] = useState(false);
  const [updateStudent, setUpdateStudent] = useState(student);

  const onClickClose = () => {
    setShow(false);
  };

  const onClickShow = () => {
    setShow(true);
  };

  const onClickUpdate = () => {
    studentService
      .update(student.id, updateStudent)
      .then(res => handleOnUpdate(res.data));
    onClickClose();
  };

  return (
    <>
      <Button variant='light' onClick={onClickShow}>
        <i className='nf nf-fa-edit'></i>
      </Button>
      <Modal show={show} onHide={onClickClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editing {student.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                value={updateStudent.name}
                name='name'
                onChange={onChange(setUpdateStudent)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='phone'>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type='text'
                name='phone'
                value={updateStudent.phone}
                onChange={onChange(setUpdateStudent)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                name='email'
                value={updateStudent.email}
                onChange={onChange(setUpdateStudent)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onClickClose}>
            Cancel
          </Button>
          <Button variant='primary' onClick={onClickUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const CreateModal = ({ handleOnCreate }) => {
  const [show, setShow] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const onClickClose = () => setShow(false);
  const onClickShow = () => setShow(true);

  const onClickCreate = () => {
    studentService.create(newStudent).then(res => handleOnCreate(res.data));
    onClickClose();
  };

  return (
    <>
      <Button variant='primary' onClick={onClickShow}>
        Add new
      </Button>
      <Modal show={show} onHide={onClickClose}>
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
                onChange={onChange(setNewStudent)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='phone'>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type='text'
                name='phone'
                value={newStudent.phone}
                onChange={onChange(setNewStudent)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                name='email'
                value={newStudent.email}
                onChange={onChange(setNewStudent)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onClickClose}>
            Close
          </Button>
          <Button variant='primary' onClick={onClickCreate}>
            Add new
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
