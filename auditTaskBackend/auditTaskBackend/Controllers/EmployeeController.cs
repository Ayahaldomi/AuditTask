using auditTaskBackend.DTOs;
using auditTaskBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace auditTaskBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly MyDbContext _dbContext;
        public EmployeeController (MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("getAllEmployees")]
        public async Task<IActionResult> getAllEmployees()
        {
            var employees = _dbContext.Employees.Where(e => e.IsDeleted != true).ToList();
            return Ok(employees);
        }

        [HttpGet("getEmployeeById/{id}")]
        public async Task<IActionResult> getEmployeeById(int id)
        {
            var employee = _dbContext.Employees.Find(id);
            if (employee == null)
            {
                return BadRequest();
            }
            var audit = new Audit
            {
                Action = "Read",
                EmployeeName = employee.Name,
                EmployeeId = employee.Id,
                UserId = 1,
                Timestamp = DateTime.Now

            };
            _dbContext.Audits.Add(audit);
            await _dbContext.SaveChangesAsync();
            return Ok(employee);
        }

        [HttpPost("postEmployees")]
        public async Task<IActionResult> postEmployees([FromForm] EmployeeDTO employee)
        {
            var addEmployee = new Employee
            {
                Name = employee.Name,
                Position = employee.Position,
                DepartmentId = employee.DepartmentId,
            };
            _dbContext.Employees.Add(addEmployee);
            await _dbContext.SaveChangesAsync();

            var audit = new Audit
            {
                Action = "Create",
                EmployeeName = employee.Name,
                EmployeeId = addEmployee.Id,
                UserId = 1,
                Timestamp = DateTime.Now

            };
            _dbContext.Audits.Add(audit);
            await _dbContext.SaveChangesAsync();
            return Ok("Employee has been added successfuly");
        }

        [HttpPut("PutEmployee/{id}")]
        public async Task<IActionResult> PutEmployee(int id, [FromForm] EmployeeDTO employee)
        {
            var existEmployee = _dbContext.Employees.FirstOrDefault(x => x.Id == id);
            if (existEmployee == null)
            {
                return BadRequest();
            }
            existEmployee.Name = employee.Name;
            existEmployee.Position = employee.Position;
            existEmployee.DepartmentId = employee.DepartmentId;
            _dbContext.Employees.Update(existEmployee);
            await _dbContext.SaveChangesAsync();

            var audit = new Audit
            {
                Action = "Update",
                EmployeeName = existEmployee.Name,
                EmployeeId = existEmployee.Id,
                UserId = 1,
                Timestamp = DateTime.Now

            };
            _dbContext.Audits.Add(audit);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("deleteEmployee/{id}")]
        public async Task<IActionResult> deleteEmployee(int id)
        {
            var employee = _dbContext.Employees.Find(id);
            if (employee == null)
            {
                return BadRequest();
            }
            
            employee.IsDeleted = true;

            var audit = new Audit
            {
                Action = "Delete",
                EmployeeName = employee.Name,
                EmployeeId = employee.Id,
                UserId = 1,
                Timestamp = DateTime.Now

            };
            _dbContext.Audits.Add(audit);

            await _dbContext.SaveChangesAsync();
            return NoContent();
        }


    }
}
