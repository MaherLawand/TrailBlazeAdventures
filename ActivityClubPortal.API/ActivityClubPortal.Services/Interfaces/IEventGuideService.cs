using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository.Models;

namespace ClassLibrary2.Services.Interfaces
{
    public interface IEventGuideService
    {
        Task<IEnumerable<EventGuide>> GetAllEventGuides();
        Task<EventGuide> GetEventGuideById(int id);
        Task<EventGuide> CreateEventGuide(EventGuide newEventGuide);
        Task UpdateEventGuide(EventGuide eventGuideToBeUpdated, EventGuide eventGuide);
        Task<EventGuide> DeleteEventGuide(int guideid,int eventid);
        Task<IEnumerable<EventGuide>> GetEventIdsByGuideId(int guideId);
        Task<EventGuide> GetLatestEventGuide();
        Task<EventGuide> GetByGuideandEventId(int guideid,int eventid);
        Task<IEnumerable<EventGuide>> GetGuideIdsByEventId(int eventid);
    }
}
