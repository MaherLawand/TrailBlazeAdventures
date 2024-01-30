using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ActivityClubPortal.Core.Repository.Models;

[Table("Member")]
[Index("Email", Name = "UQ__Member__A9D105346B29A34F", IsUnique = true)]
public partial class Member
{
    [Key]
    [Column("MemberID")]
    public int MemberId { get; set; }

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

    [StringLength(10)]
    [Unicode(false)]
    public string Gender { get; set; } = null!;

    [Column(TypeName = "date")]
    public DateTime? JoiningDate { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? MobileNumber { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? EmergencyNumber { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string? Photo { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string? Profession { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? Nationality { get; set; }

    [InverseProperty("Member")]
    public virtual ICollection<EventMember> EventMembers { get; } = new List<EventMember>();
}
