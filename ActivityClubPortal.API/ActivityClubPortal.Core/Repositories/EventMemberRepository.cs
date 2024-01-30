using System;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository;
using ActivityClubPortal.Core.Repository.Models;
using ActivityClubPortal.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ActivityClubPortal.Repositories
{
    public class EventMemberRepository : Repository<EventMember>, IEventMemberRepository
    {
        public EventMemberRepository(ActivityClubPortalDbContext context)
            : base(context)
        { }

        public async Task<IEnumerable<EventMember>> GetAllEventMembersAsync()
        {
            return await MyDbContext.EventMembers.ToListAsync();
        }

        public async Task<IEnumerable<EventMember>> GetMemberIdsByEventIdAsync(int eventId)
        {
            // Assuming EventMembers table has MemberId and EventId columns
            return await MyDbContext.EventMembers
                .Where(em => em.EventId == eventId)
                .ToListAsync();
        }

        public async Task<IEnumerable<EventMember>> GetEventMembersByIdAsync(int id)
        {
            return await MyDbContext.EventMembers.Where(em => em.MemberId == id)
                .ToListAsync();
        }
        public Task<EventMember> GetLatestEventMemberAsync()
        {
            return MyDbContext.EventMembers
                .OrderByDescending(ur => ur.EventMemberId)
                .FirstOrDefaultAsync();
        }
        public Task<EventMember> GetByMemberandEventId(int memberId, int eventId)
        {
            return MyDbContext.EventMembers.FirstOrDefaultAsync(em => em.MemberId == memberId && em.EventId == eventId);
        }

        public async Task AddEventMemberAsync(EventMember eventMember)
        {
            if (eventMember == null)
            {
                throw new ArgumentNullException(nameof(eventMember));
            }

            await MyDbContext.EventMembers.AddAsync(eventMember);
            await MyDbContext.SaveChangesAsync();
        }

        public async Task UpdateEventMemberAsync(EventMember eventMember)
        {
            if (eventMember == null)
            {
                throw new ArgumentNullException(nameof(eventMember));
            }

            MyDbContext.Entry(eventMember).State = EntityState.Modified;
            await MyDbContext.SaveChangesAsync();
        }

        public async Task DeleteEventMemberAsync(int memberid,int eventid)
        {
            var eventMember = await MyDbContext.EventMembers
                .FirstOrDefaultAsync(a => a.MemberId == memberid && a.EventId == eventid);

            if (eventMember != null)
            {
                MyDbContext.EventMembers.Remove(eventMember);
                await MyDbContext.SaveChangesAsync();
            }
        }

        private ActivityClubPortalDbContext MyDbContext => Context as ActivityClubPortalDbContext;
    }
}
