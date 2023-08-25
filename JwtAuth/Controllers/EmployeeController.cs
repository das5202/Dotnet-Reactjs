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
            var employees = _dbContext.Employees.ToList();
            return Ok(employees);
        }

        [HttpGet("byId/{id}")]
        public IActionResult GetEmployeeById(int id)
        {
            var employee = _dbContext.Employees.FirstOrDefault(e => e.EmpId == id);
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
        public IActionResult CreateEmployee([FromBody] Employee newEmployee)
        {
            // Temporarily disable identity insert
            _dbContext.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Employees ON;");

            // Insert the new employee with the provided EmpId
            _dbContext.Employees.Add(newEmployee);
            _dbContext.SaveChanges();

            // Re-enable identity insert
            _dbContext.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Employees OFF;");

            return Created("", newEmployee);
        }





        [HttpPut("update/{id}")]
        public IActionResult UpdateEmployee(int id, [FromBody] Employee updatedEmployee)
        {
            var employee = _dbContext.Employees.FirstOrDefault(e => e.EmpId == id);
            if (employee != null)
            {
                employee.EmpName = updatedEmployee.EmpName;
                _dbContext.SaveChanges();
                return Ok(employee);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            var employee = _dbContext.Employees.FirstOrDefault(e => e.EmpId == id);
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
    }
}
