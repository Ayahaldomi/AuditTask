using auditTaskBackend.DTOs;
using auditTaskBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace auditTaskBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly MyDbContext _dbContext;
        public DepartmentController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("getAllDepartment")]
        public IActionResult getAllDepartment()
        {
            var department = _dbContext.Departments.ToList();
            return Ok(department);
        }

        [HttpPost("postDepartment")]
        public IActionResult postDepartment([FromForm] DepartmentDTO departmentDTO)
        {
            var department = new Department
            {
                Name = departmentDTO.Name,
            };
            _dbContext.Departments.Add(department);
            _dbContext.SaveChanges();
            return Ok("Department added successfly");
        }
    }
}
