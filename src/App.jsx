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

  const [paging, setPaging] = useState({
    totalItems: '',
    itemsPerPage: 5,
    totalPages: '',
    currentPage: 1,
    prev: null,
    next: null,
  });

  useEffect(() => {
    studentService.getAll().then(res => {
      setStudents(res.data);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    const curTotalPages = Math.ceil(students.length / paging.itemsPerPage);
    setPaging(prev => ({
      ...prev,
      totalItems: students.length,
      totalPages: curTotalPages,
      prev: prev.currentPage <= 1 ? null : prev.currentPage - 1,
      next: prev.currentPage >= curTotalPages ? null : prev.currentPage + 1,
    }));
  }, [students]);

  const toPage = page => {
    if (page >= 0 && page <= paging.totalPages) {
      setPaging(prev => ({
        ...prev,
        currentPage: page,
        prev: page - 1,
        next: page + 1,
      }));
    }
  };

  const toPrevPage = () => {
    if (paging.prev) {
      setPaging(prev => ({
        ...prev,
        currentPage: prev.prev,
        prev: prev.prev <= 1 ? null : prev.prev - 1,
        next: prev.next - 1,
      }));
    }
  };

  const toNextPage = () => {
    if (paging.next) {
      setPaging(prev => ({
        ...prev,
        currentPage: prev.next,
        next: prev.next >= prev.totalPages ? null : prev.next + 1,
        prev: prev.prev + 1,
      }));
    }
  };

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

  const filteredList = students
    ? students
        .filter(byQuery(query))
        .slice(
          (paging.currentPage - 1) * paging.itemsPerPage,
          paging.currentPage * paging.itemsPerPage
        )
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
        paging={paging}
        toPrevPage={toPrevPage}
        toPage={toPage}
        toNextPage={toNextPage}
      />
    </div>
  );
};

export default App;
