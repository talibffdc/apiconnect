import React, { useState } from "react";
import axios from "axios";

function Employee({ employeeData, onUpdate, fetchData, id }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedEmployee, setUpdatedEmployee] = useState({ ...employeeData });
  console.log(updatedEmployee.name);

  const modalId = `exampleModal${id}`;

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate(updatedEmployee);
    setIsEditing(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://crud-api-first.onrender.com/todos/${id}`);
      fetchData();
      window.alert("Employee deleted successfully!");
    } catch (error) {
      console.error("Error deleting employee:", error);
      window.alert("Error deleting employee. Please try again.");
    }
  };

  //   const handleUpdate = async (id) => {
  //   try {
  //     // Replace the URL with your update API endpoint
  //     await axios.put(`https://crud-api-first.onrender.com/todos/${id}`, updatedEmployee);

  //     // Optionally, update the local state or refresh the data after successful update
  //     const updatedData = employeeData.map(employee => {
  //       if (employee.id === id) {
  //         return { ...employee, ...updatedEmployee };
  //       }
  //       return employee;
  //     });

  //     setUpdatedEmployee(updatedData);
  //     setIsEditing(false);
  //     fetchData();

  //   } catch (error) {
  //     setIsEditing(false);
  //     console.error('Error updating employee:', error);
  //   }
  // };

  const handleUpdate = async () => {
    try {
      // Replace the URL with your update API endpoint
      await axios.put(
        `https://crud-api-first.onrender.com/todos/${employeeData._id}`,
        updatedEmployee
      );

      // Optionally, update the local state or refresh the data after successful update
      fetchData();
      setIsEditing(false);
    } catch (error) {
      setIsEditing(false);
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{employee?.name}</td>
              <td>{employee?.position}</td>
              <td>{employee?.salary}</td>
              <td>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => handleDelete(employee._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleUpdateClick}
                  data-bs-toggle="modal"
                  data-bs-target={`#${modalId}`}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update modal here */}
      <div
        className="modal fade"
        id={modalId}
        tabIndex="-1"
        aria-labelledby={`exampleModalLabel${id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`exampleModalLabel${id}`}>
                Update Employee here
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <input
                className="form-control my-2"
                type="text"
                defaultValue={updatedEmployee.name}
                onChange={(e) =>
                  setUpdatedEmployee({
                    ...updatedEmployee,
                    name: e.target.value,
                  })
                }
              />

              <input
                className="form-control my-2"
                type="text"
                value={updatedEmployee.position}
                onChange={(e) =>
                  setUpdatedEmployee({
                    ...updatedEmployee,
                    position: e.target.value,
                  })
                }
              />
              <input
                className="form-control my-2"
                type="text"
                value={updatedEmployee.salary}
                placeholder="change"
                onChange={(e) =>
                  setUpdatedEmployee({
                    ...updatedEmployee,
                    salary: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleUpdate(updatedEmployee._id)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employee;
