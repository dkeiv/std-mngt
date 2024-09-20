import './App.css';
import { useEffect, useState } from 'react';
import Table from './components/Table';
import Search from './components/Search';

const App = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Zoe Camacho',
      phone: '132-584-001',
      email: 'zoe.camacho@mail.com',
    },
    {
      id: 2,
      name: 'Liam Johnson',
      phone: '145-784-002',
      email: 'liam.johnson@mail.com',
    },
    {
      id: 3,
      name: 'Emma Wilson',
      phone: '123-456-003',
      email: 'emma.wilson@mail.com',
    },
    {
      id: 4,
      name: 'Olivia Brown',
      phone: '987-654-004',
      email: 'olivia.brown@mail.com',
    },
    {
      id: 5,
      name: 'Noah Davis',
      phone: '456-789-005',
      email: 'noah.davis@mail.com',
    },
    {
      id: 6,
      name: 'Ava Miller',
      phone: '654-321-006',
      email: 'ava.miller@mail.com',
    },
    {
      id: 7,
      name: 'William Garcia',
      phone: '789-012-007',
      email: 'william.garcia@mail.com',
    },
    {
      id: 8,
      name: 'Sophia Martinez',
      phone: '321-654-008',
      email: 'sophia.martinez@mail.com',
    },
    {
      id: 9,
      name: 'James Rodriguez',
      phone: '555-666-009',
      email: 'james.rodriguez@mail.com',
    },
    {
      id: 10,
      name: 'Isabella Lopez',
      phone: '777-888-010',
      email: 'isabella.lopez@mail.com',
    },
    {
      id: 11,
      name: 'Benjamin Gonzalez',
      phone: '111-222-011',
      email: 'benjamin.gonzalez@mail.com',
    },
    {
      id: 12,
      name: 'Mia Hernandez',
      phone: '333-444-012',
      email: 'mia.hernandez@mail.com',
    },
    {
      id: 13,
      name: 'Lucas Wilson',
      phone: '999-000-013',
      email: 'lucas.wilson@mail.com',
    },
    {
      id: 14,
      name: 'Amelia Anderson',
      phone: '444-555-014',
      email: 'amelia.anderson@mail.com',
    },
    {
      id: 15,
      name: 'Mason Thomas',
      phone: '888-777-015',
      email: 'mason.thomas@mail.com',
    },
    {
      id: 16,
      name: 'Harper Jackson',
      phone: '222-333-016',
      email: 'harper.jackson@mail.com',
    },
    {
      id: 17,
      name: 'Elijah White',
      phone: '555-444-017',
      email: 'elijah.white@mail.com',
    },
    {
      id: 18,
      name: 'Charlotte Harris',
      phone: '666-777-018',
      email: 'charlotte.harris@mail.com',
    },
    {
      id: 19,
      name: 'Logan Martin',
      phone: '123-789-019',
      email: 'logan.martin@mail.com',
    },
    {
      id: 20,
      name: 'Mila Thompson',
      phone: '321-987-020',
      email: 'mila.thompson@mail.com',
    },
    {
      id: 21,
      name: 'Mila Thompson',
      phone: '321-987-222',
      email: 'mila.thompson.cute@mail.com',
    },
  ]);
  const [filteredList, setFilteredList] = useState([...students]);
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    setFilteredList([...students]);
  }, [students]);

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
    const newList = students.map(s => {
      if (s.id === editdStudent.id) return editdStudent;
      return s;
    });
    setStudents(newList);
  };

  const onDeleteClickHandler = id => {
    setStudents(students.filter(s => s.id !== id));
  };

  const onSearchHandler = query => {
    const { name, phone, email } = query;

    if (!name && !phone && !email) {
      setFilteredList(students);
      return;
    }

    const filtered = students
      .filter(s => {
        if (name) {
          s.name.tol;
          return s.name.toLowerCase().includes(name.toLowerCase());
        }
        return true;
      })
      .filter(s => {
        if (phone) {
          return s.phone.toLowerCase().includes(phone.toLowerCase());
        }
        return true;
      })
      .filter(s => {
        if (email) {
          return s.email.toLowerCase().includes(email.toLowerCase());
        }
        return true;
      });

    setFilteredList(filtered);
  };

  const onSortHanlder = () => {
    const sorted = [...filteredList];
    if (!isSorted) {
      setFilteredList(
        sorted.sort((s1, s2) => s1.name.toLowerCase() > s2.name.toLowerCase())
      );
    } else {
      setFilteredList(sorted.sort((s1, s2) => s1.id > s2.id));
    }
    setIsSorted(!isSorted);
  };

  return (
    <div className='container'>
      <h3>Student List</h3>
      <Table
        list={filteredList}
        addAction={onAddActionHanlder}
        editAction={onEditClickHandler}
        deleteAction={onDeleteClickHandler}
        sortAction={onSortHanlder}
      />
      <Search onSearch={onSearchHandler} />
    </div>
  );
};

export default App;
