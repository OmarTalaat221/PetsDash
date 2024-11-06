import './style.css';
import Table from 'react-bootstrap/Table';

export default function TableComponent({header , children}) {
    return (
        <table className='custom_table'>
          <thead className='table_head'>
            <tr>
                {header.map(item => <th>{item}</th>)}
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      );
}
