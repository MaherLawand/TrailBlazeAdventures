using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ActivityClubPortal.Core.Repository.Models;

[Table("UserRole")]
public partial class UserRole
{
    [Key]
    [Column("UserRoleID")]
    public int UserRoleId { get; set; }

    [Column("UserID")]
    public int UserId { get; set; }

    [Column("RoleID")]
    public int RoleId { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string RoleName { get; set; } = null!;

    [ForeignKey("UserId")]
    [InverseProperty("UserRoles")]
    public virtual User User { get; set; } = null!;
}
