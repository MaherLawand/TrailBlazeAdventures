using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ActivityClubPortal.Core.Repository.Models;

[Table("Lookup")]
public partial class Lookup
{
    [Key]
    [Column("LookupID")]
    public int LookupId { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string LookUpCode { get; set; } = null!;

    [StringLength(255)]
    [Unicode(false)]
    public string LookUpName { get; set; } = null!;

    public int LookUpOrder { get; set; }

    [InverseProperty("Category")]
    public virtual ICollection<Event> Events { get; } = new List<Event>();
}
