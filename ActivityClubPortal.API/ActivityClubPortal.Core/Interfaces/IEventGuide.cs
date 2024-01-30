using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository.Models;

namespace ActivityClubPortal.Interfaces
{
    public interface IEventGuideRepository : IRepository<EventGuide>
    {
        Task<IEnumerable<EventGuide>> GetAllEventGuidesAsync();
        Task<EventGuide> GetEventGuidesByIdAsync(int id);
        Task AddEventGuideAsync(EventGuide eventGuide);
        Task<EventGuide> DeleteEventGuideAsync(int guideid,int eventid);
        Task UpdateEventGuideAsync(EventGuide eventGuide);
        Task<IEnumerable<EventGuide>> GetEventIdsByGuideIdAsync(int guideId);
        Task<EventGuide> GetLatestEventGuideAsync();
        Task<EventGuide> GetByGuideandEventIdAsync(int guideid,int eventid);
        Task<IEnumerable<EventGuide>> GetGuideIdsByEventIdAsync(int eventid);
    }
}
