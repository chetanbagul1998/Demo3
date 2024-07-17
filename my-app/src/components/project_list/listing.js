// import React from "react";

// export default function List(){
//     return (
//         <div>
//             hello
//         </div>
//     )
// }
import Table from 'react-bootstrap/Table';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';


function List() {
  return (
    <div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Product Name</th>
          <th tabindex="0">Product Quailty<label class="filter-label" for="select-filter-column-quality"><span class="sr-only">Filter by Product Quailty</span><select id="select-filter-column-quality" class="filter select-filter form-control  placeholder-selected"><option value="" selected="">Select Product Quailty...</option><option value="0">good</option><option value="1">Bad</option><option value="2">unknown</option></select></label></th>

        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Item name 0</td>
          <td>good</td>
        </tr> 
        <tr>
          <td>2</td>
          <td>Item name 1</td>
          <td>Bad</td>
        </tr>
         <tr>
          <td>3</td>
          <td>Item name 2</td>
          <td>unknown</td>
        </tr>
         <tr>
          <td>4</td>
          <td>Item name 3</td>
          <td>good</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Item name 4</td>
          <td>Bad</td>
        </tr>
        
          
      </tbody>
    </Table>
    </div>
  );
}

export default List;