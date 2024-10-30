using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace auditTaskBackend.Models;

public partial class MyDbContext : DbContext
{
    public MyDbContext()
    {
    }

    public MyDbContext(DbContextOptions<MyDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Audit> Audits { get; set; }

    public virtual DbSet<Department> Departments { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-NNTQNVK;Database=AuditTask;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Audit>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Audit__3214EC0778677A69");

            entity.ToTable("Audit");

            entity.Property(e => e.Action).HasMaxLength(50);
            entity.Property(e => e.EmployeeName).HasMaxLength(100);
            entity.Property(e => e.Timestamp).HasColumnType("datetime");

            entity.HasOne(d => d.Employee).WithMany(p => p.Audits)
                .HasForeignKey(d => d.EmployeeId)
                .HasConstraintName("FK__Audit__EmployeeI__3E52440B");

            entity.HasOne(d => d.User).WithMany(p => p.Audits)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Audit__UserId__3F466844");
        });

        modelBuilder.Entity<Department>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Departme__3214EC07BA462824");

            entity.ToTable("Department");

            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Employee__3214EC07E0661C78");

            entity.ToTable("Employee");

            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Position).HasMaxLength(100);

            entity.HasOne(d => d.Department).WithMany(p => p.Employees)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK__Employee__Depart__3B75D760");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC07049ED47F");

            entity.Property(e => e.Name).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
