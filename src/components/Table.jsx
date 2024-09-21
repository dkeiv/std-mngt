import { RemoveModal, UpdateModal } from './Modals';

const TableRow = ({ student, handleOnUpdate, handleOnRemove }) => {
  return (
    <tr>
      <td className=''>
        <p className=''>{student.name}</p>
      </td>
      <td className=''>
        <p className=''>{student.phone}</p>
      </td>
      <td className=''>
        <p className=''>{student.email}</p>
      </td>
      <td>
        <UpdateModal student={student} handleOnUpdate={handleOnUpdate} />
      </td>
      <td className=''>
        <RemoveModal handleOnRemove={handleOnRemove} student={student} />
      </td>
    </tr>
  );
};

const TableBody = ({ students, handleOnUpdate, handleOnRemove }) => {
  return (
    <tbody>
      {students.map(student => (
        <TableRow
          key={`std-${student.id}`}
          student={student}
          handleOnUpdate={handleOnUpdate}
          handleOnRemove={handleOnRemove}
        />
      ))}
    </tbody>
  );
};

const TableHeaderTitle = ({ title, colSpan, handleToggleSort }) => {
  return (
    <th className='' colSpan={colSpan}>
      <p onClick={title === 'action' ? null : () => handleToggleSort(title)}>
        {title}
      </p>
    </th>
  );
};

const TableHeader = ({ handleToggleSort }) => {
  return (
    <thead>
      <tr>
        <TableHeaderTitle
          title='name'
          colSpan={1}
          handleToggleSort={handleToggleSort}
        />
        <TableHeaderTitle
          title='phone'
          colSpan={1}
          handleToggleSort={handleToggleSort}
        />
        <TableHeaderTitle
          title='email'
          colSpan={1}
          handleToggleSort={handleToggleSort}
        />
        <TableHeaderTitle
          title='action'
          colSpan={2}
          handleToggleSort={handleToggleSort}
        />
      </tr>
    </thead>
  );
};

const Table = ({
  students,
  handleOnUpdate,
  handleOnRemove,
  handleToggleSort,
}) => {
  return (
    <>
      <table className='table table-light table-striped table-hover'>
        <TableHeader handleToggleSort={handleToggleSort} />
        <TableBody
          students={students}
          handleOnUpdate={handleOnUpdate}
          handleOnRemove={handleOnRemove}
        />
      </table>
    </>
  );
};

export default Table;
