using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository.Models;

namespace ActivityClubPortal.Interfaces
{
    public interface IGuideRepository : IRepository<Guide>
    {
        Task<IEnumerable<Guide>> GetAllGuidesAsync();
        Task<Guide> GetGuidesByIdAsync(int id);
        Task AddGuideAsync(Guide guide);
        Task DeleteGuideAsync(int id);
        Task UpdateGuideAsync(Guide guide);

    }
}
