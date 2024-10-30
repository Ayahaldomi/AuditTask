using System.ComponentModel.DataAnnotations;

namespace auditTaskBackend.DTOs
{
    public class EmployeeDTO
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = null!;

        [Required]
        [StringLength(50)]
        public string Position { get; set; } = null!;

        [Required]
        public int? DepartmentId { get; set; }
    }
}
