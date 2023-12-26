
// EmployeeList.js
import React from "react";
import Employee from "./Employee";

function EmployeeList({ employeeData, onDelete, onUpdate, fetchData }) {

  return (
    <div>
      {employeeData.map((employee) => (
        <Employee
          key={employee._id}
          employee={employee}
          onDelete={onDelete}
          onUpdate={onUpdate}
          fetchData={fetchData}
        />
      ))}
    </div>
  );
}

export default EmployeeList;
