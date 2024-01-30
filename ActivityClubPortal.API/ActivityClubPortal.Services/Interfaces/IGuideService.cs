using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository.Models;

namespace ClassLibrary2.Services.Interfaces
{
    public interface IGuideService
    {
        Task<IEnumerable<Guide>> GetAllGuides();
        Task<Guide> GetGuideById(int id);
        Task<Guide> CreateGuide(Guide newGuide);
        Task UpdateGuide(Guide guideToBeUpdated, Guide guide);
        Task<Guide> DeleteGuide(int id);
    }
}
