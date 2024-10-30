using System;
using System.Collections.Generic;

namespace auditTaskBackend.Models;

public partial class Audit
{
    public int Id { get; set; }

    public string Action { get; set; } = null!;

    public string EmployeeName { get; set; } = null!;

    public int? EmployeeId { get; set; }

    public int? UserId { get; set; }

    public DateTime Timestamp { get; set; }

    public virtual Employee? Employee { get; set; }

    public virtual User? User { get; set; }
}
