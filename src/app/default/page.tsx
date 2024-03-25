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
  class MixDepartment extends Department {
    president: string;
    greet: Function ;
    constructor(id: number, name: string, admins: string[], employees: string[],president:string,greet:Function) {
      super(id, name, admins, employees)
      this.president = president;
      this.greet = greet;
    }
    

  }
 function merge<T extends object, U extends object>(objA: T, objB: U) {
   return Object.assign(objA, objB);
 } 

 const functionalities ={
  president: "John Doe",
  greet(name:string){
    

    return `Hello ${name}, your president is ${this.president}`
  },
 }

  const [departments, setDepartments] = useState<Department[]>([])
  const [newDepartment, setNewDepartment] = useState<Department|null>(null)
  const [departmentsToMerge, setDepartmentsToMerge] = useState<Department|null>(null)
  const [mixDepartments, setMixDepartments] = useState<MixDepartment[]>([])

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

  const createMixDepartment = ()=>
  {
    const {id,name,admins,employees,president,greet}= merge(departmentsToMerge!,functionalities);
    console.log(president,greet)
    setMixDepartments([...mixDepartments, new MixDepartment(id,name,admins,employees,president,greet)]);
  }

  const handleDepartmentsMerge = (e: React.FormEvent<HTMLSelectElement>) => {
    const department = departments.find((department) => department.name === e.currentTarget.value);
    if (department) {
      setDepartmentsToMerge(department)
    }
  }

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
      <h2>Merge Departments</h2>
      <select onChange={handleDepartmentsMerge}>
        <option value="">Select department</option>
        {departments.map((department) => (
          <option key={department.id} value={department.name}>
            {department.name}
          </option>
        ))}
      </select>
      
      <button onClick={createMixDepartment}>Merge</button>
      <h2>Mixed Departments</h2>
      <ul>
        {mixDepartments.length>0?mixDepartments.map((department) => (
          <li key={department.id}>
            <h3>{department.name}</h3>
            <button onClick={()=>alert(department.greet(department.name))}>Greet</button>
          
          </li>
        )):<p>No mixed departments</p>}
      </ul>
    </div>
  );
}

export default DefaultPage