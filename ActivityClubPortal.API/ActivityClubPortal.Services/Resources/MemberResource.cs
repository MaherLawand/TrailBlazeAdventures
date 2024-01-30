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
    public class MemberResource
    {
        public int MemberId { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; } 
        public string? Password { get; set; } 
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public DateTime? JoiningDate { get; set; }
        public string? MobileNumber { get; set; }
        public string? EmergencyNumber { get; set; }
        public IFormFile? Photo { get; set; }
        public string? Profession { get; set; }
        public string? Nationality { get; set; }

    }
}
