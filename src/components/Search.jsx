import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';

const Search = ({ onSearch }) => {
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

  const handleClick = () => {
    onSearch(query);
  };

  return (
    <>
      <Form>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='name'
            name='name'
            value={query.name}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group controlId='phone'>
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type='text'
            placeholder='phone'
            name='phone'
            value={query.phone}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='mail'
            name='email'
            value={query.email}
            onChange={onChange}
          />
        </Form.Group>
      </Form>
      <Button variant='primary' onClick={handleClick}>
        Search
      </Button>
    </>
  );
};

export default Search;
