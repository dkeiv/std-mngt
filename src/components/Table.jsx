import { DeleteModal, EditModal, AddModal } from './Modals';

const TableRow = ({ student, editAction, deleteAction }) => {
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
        <EditModal student={student} editAction={editAction} />
      </td>
      <td className=''>
        <DeleteModal deleteAction={deleteAction} student={student} />
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

const TableHeaderTitle = ({ title, colSpan, sortAction }) => {
  return (
    <th className='' colSpan={colSpan}>
      <p onClick={sortAction ? sortAction : null}>{title}</p>
    </th>
  );
};

const TableHeader = ({ sortAction }) => {
  return (
    <thead>
      <tr>
        <TableHeaderTitle title='name' colSpan={1} sortAction={sortAction} />
        <TableHeaderTitle title='phone' colSpan={1} />
        <TableHeaderTitle title='email' colSpan={1} />
        <TableHeaderTitle title='action' colSpan={2} />
      </tr>
    </thead>
  );
};

const Table = ({ list, editAction, deleteAction, addAction, sortAction }) => {
  return (
    <>
      <table className='table table-light table-striped table-hover'>
        <TableHeader sortAction={sortAction} />
        <TableBody
          list={list}
          editAction={editAction}
          deleteAction={deleteAction}
        />
      </table>
      <AddModal addAction={addAction} />
    </>
  );
};

export default Table;
