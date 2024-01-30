using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ActivityClubPortal.Core.Repository.Models;

[Table("EventMember")]
public partial class EventMember
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("EventMemberID")]
    public int EventMemberId { get; set; }

    [Column("EventID")]
    public int? EventId { get; set; }

    [Column("MemberID")]
    public int? MemberId { get; set; }

    [ForeignKey("EventId")]
    [InverseProperty("EventMembers")]
    public virtual Event? Event { get; set; }

    [ForeignKey("MemberId")]
    [InverseProperty("EventMembers")]
    public virtual Member? Member { get; set; }
}
