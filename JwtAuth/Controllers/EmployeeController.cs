using JwtAuth.Data;
using JwtAuth.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace JwtAut.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class EmployeeController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public EmployeeController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("all")]
        public IActionResult GetAllEmployees()
        {
            var employees = _dbContext.Employees.Include(e => e.Department).ToList();
            return Ok(employees);
        }

        [HttpGet("byId/{id}")]
        public IActionResult GetEmployeeById(int id)
        {
            var employee = _dbContext.Employees.Include(e => e.Department).FirstOrDefault(e => e.EmpId == id);
            if (employee != null)
            {
                return Ok(employee);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost("create")]
        public IActionResult CreateEmployee([FromBody] Employee employee)
        {
            if (employee == null)
            {
                return BadRequest("Invalid employee data.");
            }

            // Create a new department or fetch an existing department by name
            var department = _dbContext.Departments.FirstOrDefault(d => d.DepartmentName == employee.Department.DepartmentName);

            if (department == null)
            {
                // If the department doesn't exist, create a new one
                department = new Department
                {
                    DepartmentName = employee.Department.DepartmentName
                };

                _dbContext.Departments.Add(department);
            }

            // Create the new employee and associate it with the department
            var newEmployee = new Employee
            {
                EmpName = employee.EmpName,
                EmployeeAddress = employee.EmployeeAddress,
                EmployeeSalary = employee.EmployeeSalary,
                Department = department
            };

            _dbContext.Employees.Add(newEmployee);
            _dbContext.SaveChanges();

            // Return the newly created employee along with department details
            var response = new
            {
                Employee = newEmployee,
                Department = department
            };

            return Created("", response);
        }

        [HttpPut("update/{employeeId}")]
        public IActionResult UpdateEmployee(int employeeId, [FromBody] Employee updatedEmployee)
        {
            // Find the employee by ID
            var employee = _dbContext.Employees.Include(e => e.Department).FirstOrDefault(e => e.EmpId == employeeId);

            if (employee != null)
            {
                // Update employee properties
                employee.EmpName = updatedEmployee.EmpName;
                employee.EmployeeAddress = updatedEmployee.EmployeeAddress;
                employee.EmployeeSalary = updatedEmployee.EmployeeSalary;

                // Update the department name if it has changed
                if (employee.Department.DepartmentName != updatedEmployee.Department.DepartmentName)
                {
                    var newDepartment = _dbContext.Departments.FirstOrDefault(d => d.DepartmentName == updatedEmployee.Department.DepartmentName);

                    if (newDepartment == null)
                    {
                        // If the new department doesn't exist, create a new one
                        newDepartment = new Department
                        {
                            DepartmentName = updatedEmployee.Department.DepartmentName
                        };

                        _dbContext.Departments.Add(newDepartment);
                    }

                    // Associate the employee with the new department
                    employee.Department = newDepartment;
                }

                // Save changes to the database
                _dbContext.SaveChanges();

                // Return the updated employee
                return Ok(employee);
            }
            else
            {
                // Employee not found, return a 404 response
                return NotFound();
            }
        }



        [HttpDelete("delete/{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            var employee = _dbContext.Employees.Include(e => e.Department).FirstOrDefault(e => e.EmpId == id);
            if (employee != null)
            {
                _dbContext.Employees.Remove(employee);
                _dbContext.SaveChanges();
                return Ok(employee);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet("departments")]
        public IActionResult GetAllDepartments()
        {
            var departments = _dbContext.Departments.ToList();
            return Ok(departments);
        }

    }
}
