using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository.Models;
using ActivityClubPortal.Interfaces;
using ClassLibrary2.Services.Interfaces;

namespace ClassLibrary2.Services
{
    public class EventGuideService : IEventGuideService
    {
        private readonly IUnitOfWork _unitOfWork;
        public EventGuideService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<EventGuide> CreateEventGuide(EventGuide newEventGuide)
        {
            await _unitOfWork.EventGuides.AddAsync(newEventGuide);
            await _unitOfWork.CommitAsync();
            return newEventGuide;
        }

        public async Task<EventGuide> DeleteEventGuide(int guideid, int eventid)
        {
            return await _unitOfWork.EventGuides.DeleteEventGuideAsync(guideid,eventid);

        }

        public async Task<EventGuide> GetLatestEventGuide()
        {
            return await _unitOfWork.EventGuides.GetLatestEventGuideAsync();
        }

        public async Task<EventGuide> GetByGuideandEventId(int guideid, int eventid)
        {
            return await _unitOfWork.EventGuides.GetByGuideandEventIdAsync(guideid, eventid);
        }

        public async Task<IEnumerable<EventGuide>> GetAllEventGuides()
        {
            return await _unitOfWork.EventGuides
                .GetAllEventGuidesAsync();
        }

        public async Task<EventGuide> GetEventGuideById(int id)
        {
            return await _unitOfWork.EventGuides
                .GetEventGuidesByIdAsync(id);
        }

        public async Task UpdateEventGuide(EventGuide eventGuideToBeUpdated, EventGuide eventGuide)
        {
            eventGuideToBeUpdated.EventGuideId = eventGuide.EventGuideId;
            eventGuideToBeUpdated.EventId = eventGuide.EventId;
            eventGuideToBeUpdated.GuideId = eventGuide.GuideId;

            await _unitOfWork.CommitAsync();
        }

        public async Task<IEnumerable<EventGuide>> GetEventIdsByGuideId(int guideId)
        {
            return await _unitOfWork.EventGuides.GetEventIdsByGuideIdAsync(guideId);
        }
        public async Task<IEnumerable<EventGuide>> GetGuideIdsByEventId(int eventid)
        {
            return await _unitOfWork.EventGuides.GetGuideIdsByEventIdAsync(eventid);
        }
    }
}
