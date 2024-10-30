using System.ComponentModel.DataAnnotations;

namespace auditTaskBackend.DTOs
{
    public class DepartmentDTO
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = null!;
    }
}
