using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ActivityClubPortal.Core.Repository.Models;

[Table("Event")]
public partial class Event
{
    [Key]
    [Column("EventID")]
    public int EventId { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string EventName { get; set; } = null!;

    [Column(TypeName = "text")]
    public string? Description { get; set; }

    [Column("LookupID")]
    public int LookupId { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string? Destination { get; set; }

    [Column(TypeName = "date")]
    public DateTime? DateFrom { get; set; }

    [Column(TypeName = "date")]
    public DateTime? DateTo { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string? Photo { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal? Cost { get; set; }

    public bool? EventStatus { get; set; }

    [ForeignKey("LookupId")]
    [InverseProperty("Events")]
    public virtual Lookup Category { get; set; } = null!;

    [InverseProperty("Event")]
    public virtual ICollection<EventGuide> EventGuides { get; } = new List<EventGuide>();

    [InverseProperty("Event")]
    public virtual ICollection<EventMember> EventMembers { get; } = new List<EventMember>();
}
