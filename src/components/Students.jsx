import { useState } from 'react';
import Table from './Table';

const Studnets = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'khoivd1',
      phone: '555-555-001',
      email: 'khoivd@mail.com',
    },
    {
      id: 2,
      name: 'khoivd2',
      phone: '555-555-002',
      email: 'khoivd2@mail.com',
    },
    {
      id: 3,
      name: 'khoivd3',
      phone: '555-555-003',
      email: 'khoivd3@mail.com',
    },
  ]);

  const getNewID = () => {
    const ids = students.map(s => s.id);
    return Math.max(...ids) + 1;
  };

  const onAddActionHanlder = newStudent => {
    setStudents(
      students.concat({
        id: getNewID(),
        ...newStudent,
      })
    );
  };

  const onEditClickHandler = editdStudent => {
    console.log(editdStudent);
    setStudents(
      students.map(s => {
        if (s.id === editdStudent.id) return editdStudent;
        return s;
      })
    );
    // setEditStudent(student);
  };

  const onDeleteClickHandler = id => {
    setStudents(students.filter(s => s.id !== id));
  };

  return (
    <Table
      list={students}
      addAction={onAddActionHanlder}
      editAction={onEditClickHandler}
      deleteAction={onDeleteClickHandler}
    />
  );
};

export default Studnets;
