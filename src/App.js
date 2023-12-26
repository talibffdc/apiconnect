import React, { useState, useEffect } from "react";
import employees from "./data";
import EmployeeList from "./EmployeeList";
import axios from "axios";

function App() {
  const [employeeData, setEmployeeData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    title: "",
   description: "",
  
  });

  const handleDelete = (id) => {
    setEmployeeData(employeeData.filter((employee) => employee.id !== id));
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/showdata"); // Replace with your API endpoint
      console.log(response.data);
      setEmployeeData(response.data);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {

    // Fetch initial data when the component mounts
    
  
    fetchData();
  }, []); 





  const handleAdd = () => {
    setShowAddForm(true);
  };

  const handleSave = () => {
    // Generate a unique ID for the new employee
    const newId = Math.max(...employeeData.map((employee) => employee.id)) + 1;
    setEmployeeData([...employeeData, { id: newId, ...newEmployee }]);
    setNewEmployee({ title: "", description: ""});
    setShowAddForm(false);
  };

  const handleUpdate = (updatedEmployee) => {
    const updatedData = employeeData.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    setEmployeeData(updatedData);
  };

  const handleCreate = async () => {
    try {
      // Replace the URL with your create API endpoint
      const response = await axios.post('http://localhost:8000/todos', newEmployee);
      
      // Handle the response as needed, e.g., update the UI or navigate to another page
      console.log('Employee created:', response.data);

      // Optionally, clear the form after successful creation
      setNewEmployee({
        title: '',
        description:'',
        // Reset other properties as needed
      });
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h1>Employee Management System</h1>
        <button className="btn btn-primary mb-3" onClick={handleAdd}  data-bs-toggle="modal" data-bs-target="#exampleModal">
          Add New Employee
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
          
        
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

        <input className="form-control my-2" placeholder=" title" type="text" value={newEmployee.title} onChange={(e) => setNewEmployee({ ...newEmployee, title: e.target.value })} />
        <input className="form-control my-2" placeholder=" description" type="text" value={newEmployee.description}
                  onChange={(e) => setNewEmployee({ ...newEmployee, description: e.target.value })}/>
                  

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button className="btn btn-success" data-bs-dismiss="modal"onClick={handleCreate} >
                Save
              </button>
      </div>
    </div>
  </div>
</div>

        



      <EmployeeList employeeData={employeeData} onDelete={handleDelete} onUpdate={handleUpdate} fetchData={fetchData} />
    </div>
    </>
  );
}

export default App;