import { Row, Col, Form } from 'react-bootstrap';
// import studentService from '../services/student';

const Search = ({ onQueryChange, query }) => {
  return (
    <Form>
      <Form.Group controlId='name' as={Row} className='mb-3'>
        <Form.Label column sm='1'>
          Filter:
        </Form.Label>
        <Col>
          <Form.Control
            type='text'
            placeholder='name'
            name='name'
            value={query.name}
            onChange={e => onQueryChange(e)}
          />
        </Col>
        <Col>
          <Form.Control
            type='text'
            placeholder='phone'
            name='phone'
            value={query.phone}
            onChange={e => onQueryChange(e)}
          />
        </Col>
        <Col>
          <Form.Control
            type='text'
            placeholder='mail'
            name='email'
            value={query.email}
            onChange={e => onQueryChange(e)}
          />
        </Col>
      </Form.Group>
    </Form>
  );
};

export default Search;
