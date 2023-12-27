import React, { useState } from "react";
import axios from "axios";

function Employee({ employee, onDelete, onUpdate,fetchData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedEmployee, setUpdatedEmployee] = useState({ ...employee });

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate(updatedEmployee);
    setIsEditing(false);
  };
  const handleDelete = async (id) => {
    try {
      // Replace the URL with your delete API endpoint
      await axios.delete(`https://crud-api-first.onrender.com/todos/${id}`);
      fetchData();
      
      // Update the state after successful deletion
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
    
  };


  const handleUpdate = async (id) => {
    try {
      // Replace the URL with your update API endpoint
      await axios.put(`https://crud-api-first.onrender.com/todos/${id}`, updatedEmployee);

      
      // Optionally, update the local state or refresh the data after successful update
      const updatedData = employee.map(employee => {
        if (employee.id === id) {
          return { ...employee, ...updatedEmployee };
        }
        return employee;
      });

      setUpdatedEmployee(updatedData);
      setIsEditing(false);
      fetchData();
      
    } catch (error) {
      setIsEditing(false);
      console.error('Error updating employee:', error);
    }
  };


  return (
    <div className="card mb-3" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{employee?.title}</h5>
        <p className="card-text">Position: {employee?.description}</p>

        {isEditing ? (
          <>
            <input
              type="text"
              value={updatedEmployee.title}
              onChange={(e) =>
                setUpdatedEmployee({
                  ...updatedEmployee,
                  title: e.target.value,
                })
              }
            />
            <input
              type="text"
              value={updatedEmployee.description}
              onChange={(e) =>
                setUpdatedEmployee({
                  ...updatedEmployee,
                  description: e.target.value,
                })
              }
            />
           
           
            <button className="btn btn-success" onClick={() => handleUpdate(employee._id)}>
              Save
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-danger mx-2"  onClick={() => handleDelete(employee._id)}>
              Delete
            </button>
            <button className="btn btn-primary" onClick={handleUpdateClick}>
              Update
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Employee;
