using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ActivityClubPortal.Core.Repository.Models;

[Table("Guide")]
[Index("Email", Name = "UQ__Guide__A9D105341BC79C4A", IsUnique = true)]
public partial class Guide
{
    [Key]
    [Column("GuideID")]
    public int GuideId { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string FullName { get; set; } = null!;

    [StringLength(255)]
    [Unicode(false)]
    public string Email { get; set; } = null!;

    [StringLength(255)]
    [Unicode(false)]
    public string Password { get; set; } = null!;

    [Column(TypeName = "date")]
    public DateTime DateOfBirth { get; set; }

    [Column(TypeName = "date")]
    public DateTime? JoiningDate { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string? Photo { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string? Profession { get; set; }

    [InverseProperty("Guide")]
    public virtual ICollection<EventGuide> EventGuides { get; } = new List<EventGuide>();
}
