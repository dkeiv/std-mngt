import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import studentService from '../services/student';

const Search = ({ handleOnSearch }) => {
  const [query, setQuery] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const onChange = e => {
    const { name, value } = e.target;
    setQuery(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onClickSearch = () => {
    studentService.search(query).then(res => {
      handleOnSearch(res.data);
    });
  };

  const onClickClear = () => {
    setQuery({
      name: '',
      phone: '',
      email: '',
    });
  };

  return (
    <Form className='row my-3'>
      <Form.Group controlId='name' className='col-2'>
        <Form.Control
          type='text'
          placeholder='name'
          name='name'
          value={query.name}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group controlId='phone' className='col-2'>
        <Form.Control
          type='text'
          placeholder='phone'
          name='phone'
          value={query.phone}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group controlId='email' className='col-2'>
        <Form.Control
          type='text'
          placeholder='mail'
          name='email'
          value={query.email}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group className='col-2'>
        <Button variant='primary' onClick={onClickSearch} className=''>
          Search
        </Button>
        <Button variant='primary' onClick={onClickClear} className='ms-2'>
          Clear
        </Button>
      </Form.Group>
    </Form>
  );
};

export default Search;
