import './App.css';
import { useEffect, useState } from 'react';
import Table from './components/Table';
import Search from './components/Search';
import studentService from './services/student';
import { CreateModal } from './components/Modals';
import BasicPagination from './components/BasicPagination';

const App = () => {
  const [students, setStudents] = useState([]);
  const [isASC, setIsASC] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    studentService.getAll().then(res => {
      setStudents(res.data);
      setIsLoaded(true);
    });
  }, []);

  const handleOnCreate = newStudent => {
    setStudents(students.concat(newStudent));
  };

  const handleOnUpdate = updatedStudent => {
    setStudents(
      students.map(s => (s.id !== updatedStudent.id ? s : updatedStudent))
    );
  };

  const handleOnRemove = id => {
    setStudents(students.filter(s => s.id !== id));
  };

  const byQuery = query => s => {
    return (
      s.name.toLowerCase().indexOf(query.name.toLowerCase()) >= 0 &&
      s.phone.toLowerCase().indexOf(query.phone.toLowerCase()) >= 0 &&
      s.email.toLowerCase().indexOf(query.email.toLowerCase()) >= 0
    );
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const filteredList = students
    ? students
        .filter(byQuery(query))
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : students;

  const onQueryChange = e => {
    const { name, value } = e.target;
    setQuery(prevSate => ({
      ...prevSate,
      [name]: value,
    }));
  };

  const handleToggleSort = field => {
    studentService.sortBy(field, isASC).then(res => setStudents(res.data));
    setIsASC(!isASC);
  };

  return (
    <div className='container'>
      <h3>Student List</h3>
      <Search query={query} onQueryChange={onQueryChange} />
      {isLoaded ? (
        <Table
          students={filteredList}
          handleOnUpdate={handleOnUpdate}
          handleOnRemove={handleOnRemove}
          handleToggleSort={handleToggleSort}
        />
      ) : (
        <div>
          getting data ...<i className='nf nf-md-snail'></i>
        </div>
      )}
      <CreateModal handleOnCreate={handleOnCreate} />
      <BasicPagination
        students={students}
        itemsPerPage={itemsPerPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
