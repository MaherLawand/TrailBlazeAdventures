using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository.Models;

namespace ActivityClubPortal.Interfaces
{
    public interface IEventMemberRepository : IRepository<EventMember>
    {
        Task<IEnumerable<EventMember>> GetAllEventMembersAsync();
        Task<IEnumerable<EventMember>> GetEventMembersByIdAsync(int id);
        Task<EventMember> GetLatestEventMemberAsync();
        Task<EventMember> GetByMemberandEventId(int memberId, int eventId);
        Task<IEnumerable<EventMember>> GetMemberIdsByEventIdAsync(int eventId);
        Task AddEventMemberAsync(EventMember eventMember);
        Task DeleteEventMemberAsync(int memberid,int eventid);
        Task UpdateEventMemberAsync(EventMember eventMember);
    }
}
