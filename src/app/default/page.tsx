"use client";
import { useState } from "react"

const DefaultPage = () => {
  class Department {
    id: number
    name: string
    admins: string[]
    employees: string[]
    constructor(id: number, name: string, admins: string[], employees: string[]) {
      this.id = id
      this.name = name
      this.admins = admins
      this.employees = employees
    }
  }
  const [departments, setDepartments] = useState<Department[]>([])
  const [newDepartment, setNewDepartment] = useState<Department|null>(null)

  const addDepartment = (e:React.FormEvent) => {
    e.preventDefault();

    if (newDepartment) {
      setDepartments([...departments, newDepartment])
    }
  }

  const createDepartment = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value;
    setNewDepartment(new Department(departments.length + 1, name, [], []));
  };

  const addAdmin = (department: Department) => {
    const newAdmin = prompt("Enter admin name");
    department.admins.push(newAdmin || "");
    setDepartments([...departments]);
  };
  const addEmployee = (department: Department) => {
    const newEmployee = prompt("Enter employee name");
    department.employees.push(newEmployee || "");
    setDepartments([...departments]);
  };

  return (
    <div>
      <h1>Welcome to my App!</h1>
      <p>Here are the departments:</p>
      <ul className="flex flex-col md:flex-row justify-around">
        {departments.length > 0 ? (
          departments.map((department) => (
            <li
              key={department.id}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg p-4 m-4 text-white"
            >
              <div>
                <h3>{department.name}</h3>
                <h4>Admins:</h4>
                <ul>
                  {department.admins.length > 0 ? (
                    department.admins.map((admin) => (
                      <li key={admin}>{admin}</li>
                    ))
                  ) : (
                    <p>No admins</p>
                  )}
                </ul>
                <button
                  className="bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg p-2 text-white mt-7 mb-4"
                  onClick={() => addAdmin(department)}
                >
                  Add admin
                </button>
                <h4>Employees:</h4>
                <ul>
                  {department.employees.length > 0 ? (
                    department.employees.map((employee) => (
                      <li key={employee}>{employee}</li>
                    ))
                  ) : (
                    <p>No employees</p>
                  )}
                </ul>
                <button
                  className="bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg p-2 text-white mt-7 mb-4"
                  onClick={() => addEmployee(department)}
                >
                  Add employee
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No departments</p>
        )}
      </ul>
      <h2>Add new department</h2>
      <form onSubmit={addDepartment}>
        <input type="text" name="name" onChange={createDepartment} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default DefaultPage