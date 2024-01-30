using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ActivityClubPortal.Core.Repository.Models;

[Table("EventGuide")]
public partial class EventGuide
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("EventGuideID")]
    public int EventGuideId { get; set; }

    [Column("EventID")]
    public int? EventId { get; set; }

    [Column("GuideID")]
    public int? GuideId { get; set; }

    [ForeignKey("EventId")]
    [InverseProperty("EventGuides")]
    public virtual Event? Event { get; set; }

    [ForeignKey("GuideId")]
    [InverseProperty("EventGuides")]
    public virtual Guide? Guide { get; set; }
}
