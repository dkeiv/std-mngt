import './App.css';
import { useEffect, useState } from 'react';
import Table from './components/Table';
import Search from './components/Search';
import studentService from './services/student';
import { CreateModal } from './components/Modals';

const App = () => {
  const [students, setStudents] = useState([]);
  const [isASC, setIsASC] = useState(true);

  useEffect(() => {
    console.log('getting data ...󱙷 ');
    studentService.getAll().then(res => {
      setStudents(res.data);
      console.log('successfully fetched  ');
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

  const handleOnSearch = result => {
    setStudents(result);
  };

  const handleToggleSort = field => {
    studentService.sortBy(field, isASC).then(res => setStudents(res.data));
    setIsASC(!isASC);
  };

  return (
    <div className='container'>
      <h3>Student List</h3>
      <Search handleOnSearch={handleOnSearch} />
      <Table
        students={students}
        handleOnUpdate={handleOnUpdate}
        handleOnRemove={handleOnRemove}
        handleToggleSort={handleToggleSort}
      />
      <CreateModal handleOnCreate={handleOnCreate} />
    </div>
  );
};

export default App;
