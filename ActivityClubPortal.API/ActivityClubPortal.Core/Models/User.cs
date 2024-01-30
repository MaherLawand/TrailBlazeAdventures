using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ActivityClubPortal.Core.Repository.Models;

[Table("User")]
[Index("Email", Name = "UQ__User__A9D10534C4E69039", IsUnique = true)]
public partial class User
{
    [Key]
    [Column("UserID")]
    public int UserId { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string Name { get; set; } = null!;

    [Column(TypeName = "date")]
    public DateTime DateOfBirth { get; set; }

    [StringLength(10)]
    [Unicode(false)]
    public string Gender { get; set; } = null!;

    [StringLength(255)]
    [Unicode(false)]
    public string Email { get; set; } = null!;

    [StringLength(255)]
    [Unicode(false)]
    public string Password { get; set; } = null!;

    [InverseProperty("User")]
    public virtual ICollection<UserRole> UserRoles { get; } = new List<UserRole>();
}
