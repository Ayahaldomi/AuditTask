using auditTaskBackend.DTOs;
using auditTaskBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace auditTaskBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly MyDbContext _dbContext;
        public UserController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("GetAllUsers")]
        public IActionResult GetAllUsers()
        {
            var users = _dbContext.Users.ToList();
            return Ok(users);
        }

        [HttpPost("postUsers")]
        public IActionResult postUsers([FromForm] UserDTO userDTO)
        {
            var user = new User
            {
                Name = userDTO.Name,
            };
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return Ok(user);
        }
    }
}
