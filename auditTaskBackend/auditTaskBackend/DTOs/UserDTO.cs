using System.ComponentModel.DataAnnotations;

namespace auditTaskBackend.DTOs
{
    public class UserDTO
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = null!;
    }
}
