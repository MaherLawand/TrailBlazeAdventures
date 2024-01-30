using System;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository;
using ActivityClubPortal.Core.Repository.Models;
using ActivityClubPortal.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ActivityClubPortal.Repositories
{
    public class EventGuideRepository : Repository<EventGuide>, IEventGuideRepository
    {
        public EventGuideRepository(ActivityClubPortalDbContext context)
            : base(context)
        { }

        public async Task<IEnumerable<EventGuide>> GetAllEventGuidesAsync()
        {
            return await MyDbContext.EventGuides.ToListAsync();
        }

        public Task<EventGuide> GetEventGuidesByIdAsync(int id)
        {
            return MyDbContext.EventGuides.SingleOrDefaultAsync(a => a.EventGuideId == id);
        }

        public async Task AddEventGuideAsync(EventGuide eventGuide)
        {
            if (eventGuide == null)
            {
                throw new ArgumentNullException(nameof(eventGuide));
            }
            await MyDbContext.EventGuides.AddAsync(eventGuide);
            await MyDbContext.SaveChangesAsync();
        }

        public async Task UpdateEventGuideAsync(EventGuide eventGuide)
        {
            if (eventGuide == null)
            {
                throw new ArgumentNullException(nameof(eventGuide));
            }

            MyDbContext.Entry(eventGuide).State = EntityState.Modified;
            await MyDbContext.SaveChangesAsync();
        }

        public async Task<EventGuide> DeleteEventGuideAsync(int guideid,int eventid)
        {
            var eventGuide = await MyDbContext.EventGuides
                .SingleOrDefaultAsync(a => a.GuideId == guideid && a.EventId == eventid);

            if (eventGuide != null)
            {
                MyDbContext.EventGuides.Remove(eventGuide);
                await MyDbContext.SaveChangesAsync();
            }
            return eventGuide;
        }

        public async Task<IEnumerable<EventGuide>> GetEventIdsByGuideIdAsync(int guideId)
        {
            // Assuming EventMembers table has MemberId and EventId columns
            return await MyDbContext.EventGuides
                .Where(em => em.GuideId == guideId)
                .ToListAsync();
        }
        public async Task<IEnumerable<EventGuide>> GetGuideIdsByEventIdAsync(int eventid)
        {
            return await MyDbContext.EventGuides.Where(a => a.EventId == eventid)
                .ToListAsync();
        }

        public Task<EventGuide> GetLatestEventGuideAsync()
        {
            return MyDbContext.EventGuides
                .OrderByDescending(ur => ur.EventGuideId)
                .FirstOrDefaultAsync();
        }

        public Task<EventGuide> GetByGuideandEventIdAsync(int guideId, int eventId)
        {
            return MyDbContext.EventGuides.FirstOrDefaultAsync(em => em.GuideId == guideId && em.EventId == eventId);
        }

        private ActivityClubPortalDbContext MyDbContext => Context as ActivityClubPortalDbContext;
    }
}
