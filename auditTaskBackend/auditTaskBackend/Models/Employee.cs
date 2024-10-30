using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace auditTaskBackend.Models;

public partial class Employee
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Position { get; set; } = null!;

    public int? DepartmentId { get; set; }

    public bool IsDeleted { get; set; }

    public virtual ICollection<Audit> Audits { get; set; } = new List<Audit>();

    public virtual Department? Department { get; set; }
}
