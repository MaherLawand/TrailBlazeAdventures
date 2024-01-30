using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

namespace ActivityClubPortal.Services.Resources
{
    public class GuideResource
    {
        public int GuideId { get; set; }
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;

        public DateTime DateOfBirth { get; set; }
        public DateTime? JoiningDate { get; set; }
        public IFormFile? Photo { get; set; }
        public string? Profession { get; set; }
    }
}
