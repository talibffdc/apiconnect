
// EmployeeList.js
import React from "react";
import Employee from "./Employee";

function EmployeeList({ employeeData, onDelete, onUpdate, fetchData, }) {

  return (
    <div>
        <Employee
          employeeData={employeeData}
         
         
          onDelete={onDelete}
          onUpdate={onUpdate}
          fetchData={fetchData}
        />
    </div>
  );
}

export default EmployeeList;
