using auditTaskBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace auditTaskBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuditController : ControllerBase
    {
        private readonly MyDbContext _dbContext;
        public AuditController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("GetAllAudit")]
        public async Task<IActionResult> GetAllAudit()
        {
            var audits = await _dbContext.Audits.ToListAsync();
            return Ok(audits);
        }

        [HttpGet("GetAuditById/{id}")]
        public async Task<IActionResult> GetAuditById(int id)
        {
            var audit = await _dbContext.Audits.FindAsync(id);
            return Ok(audit);
        }

        [HttpDelete("DeleteAudit/{id}")]
        public async Task<IActionResult> DeleteAudit(int id)
        {
            var audit = await _dbContext.Audits.FindAsync(id);
            if(audit == null)
            {
                return BadRequest();
            }
            _dbContext.Audits.Remove(audit);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
