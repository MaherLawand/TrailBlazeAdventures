using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace ClassLibrary2.Services.Resources
{
    public class EventResource
    {
        public int? EventId { get; set; }
        public string? EventName { get; set; } = null!;
        public string? Description { get; set; }
        public int? CategoryId { get; set; }
        public string? Destination { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public IFormFile? Photo { get; set; }
        public decimal? Cost { get; set; }
        public bool? EventStatus { get; set; }
    }
}
