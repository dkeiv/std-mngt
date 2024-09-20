import { useState } from 'react';
import './App.css';

const ActionBtn = ({ title, handler }) => {
  return <button onClick={handler}>{title}</button>;
};

const FormField = ({ label, value, onChangeHandle }) => {
  return (
    <div>
      <label className='block text-sm font-medium leading-6 text-gray-900'>
        {label}
      </label>
      <input name={label} type='text' value={value} onChange={onChangeHandle} />
    </div>
  );
};

const UpdateForm = ({ name, action, student, onChangeHandle }) => {
  return (
    <form onSubmit={action(student ? student.id : -1)}>
      {/* <FormField label='id' value={student ? student.id : ''} /> */}
      <FormField
        label='name'
        value={student ? student.name : ''}
        onChangeHandle={onChangeHandle}
      />
      <FormField
        label='phone'
        value={student ? student.phone : ''}
        onChangeHandle={onChangeHandle}
      />
      <FormField
        label='email'
        value={student ? student.email : ''}
        onChangeHandle={onChangeHandle}
      />
      <button type='submit'>{name}</button>
    </form>
  );
};

const Form = ({ name, action }) => {
  return (
    <form onSubmit={action}>
      <FormField label='name' />
      <FormField label='phone' />
      <FormField label='email' />
      <button type='submit'>{name}</button>
    </form>
  );
};

const TableRow = ({ student, editAction, deleteAction }) => {
  return (
    <tr>
      <td>{student.name}</td>
      <td>{student.phone}</td>
      <td>{student.email}</td>
      <td>
        <ActionBtn title='Edit' handler={() => editAction(student.id)} />
        <ActionBtn title='Delete' handler={() => deleteAction(student.id)} />
      </td>
    </tr>
  );
};

const TableBody = ({ list, editAction, deleteAction }) => {
  return (
    <tbody>
      {list.map(student => (
        <TableRow
          key={`std-${student.id}`}
          student={student}
          editAction={editAction}
          deleteAction={deleteAction}
        />
      ))}
    </tbody>
  );
};

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>name</th>
        <th>phone</th>
        <th>email</th>
        <th colSpan={2}>action</th>
      </tr>
    </thead>
  );
};

const Table = ({ list, editAction, deleteAction }) => {
  return (
    <table className='table-auto border-collapse border border-slate-500'>
      <TableHeader />
      <TableBody
        list={list}
        editAction={editAction}
        deleteAction={deleteAction}
      />
    </table>
  );
};

function App() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'khoivd',
      phone: '555-555-001',
      email: 'khoivd@mail.com',
    },
    {
      id: 2,
      name: 'khoivd',
      phone: '555-555-001',
      email: 'khoivd@mail.com',
    },
    {
      id: 3,
      name: 'khoivd',
      phone: '555-555-001',
      email: 'khoivd@mail.com',
    },
    {
      id: 4,
      name: 'khoivd',
      phone: '555-555-001',
      email: 'khoivd@mail.com',
    },
    {
      id: 5,
      name: 'khoivd',
      phone: '555-555-001',
      email: 'khoivd@mail.com',
    },
  ]);
  const [editStudent, setEditStudent] = useState(null);

  const getNewID = () => {
    const ids = students.map(s => s.id);
    return Math.max(...ids) + 1;
  };

  const onEditClickHandler = id => {
    const student = students.find(s => s.id === id);
    console.log(student);
    setEditStudent(student);
  };

  const onDeleteClickHandler = id => {
    setStudents(students.filter(s => s.id !== id));
  };

  const onAddActionHanlder = e => {
    e.preventDefault();
    const newStudent = {
      id: getNewID(),
      name: e.target[0].value,
      phone: e.target[1].value,
      email: e.target[2].value,
    };

    setStudents(students.concat(newStudent));

    // clear input
    e.target[0].value = '';
    e.target[1].value = '';
    e.target[2].value = '';
  };

  const onEditActionHandler = id => e => {
    e.preventDefault();

    const editedStudent = {
      id,
      name: e.target[0].value,
      phone: e.target[1].value,
      email: e.target[2].value,
    };
    setStudents(
      students.map(s => {
        if (s.id === id) return editedStudent;
        return s;
      })
    );
    setEditStudent(null);
  };

  const onChangeHandle = e => {
    const { name, value } = e.target;
    setEditStudent(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Form name='Add' action={onAddActionHanlder} />
      <Table
        list={students}
        editAction={onEditClickHandler}
        deleteAction={onDeleteClickHandler}
      />
      <UpdateForm
        name='Edit'
        action={onEditActionHandler}
        student={editStudent}
        onChangeHandle={onChangeHandle}
      />
    </>
  );
}

export default App;
