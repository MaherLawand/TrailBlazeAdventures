using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository.Models;

namespace ClassLibrary2.Services.Interfaces
{
    public interface IEventMemberService
    {
        Task<IEnumerable<EventMember>> GetAllEventMembers();
        Task<IEnumerable<EventMember>> GetEventMemberById(int id);
        Task<EventMember> GetLatestEventMember();
        Task<EventMember> GetByMemberandEventId(int memberId,int eventId);
        Task<EventMember> CreateEventMember(EventMember newEventMember);
        Task UpdateEventMember(EventMember eventMemberToBeUpdated, EventMember eventMember);
        Task<EventMember> DeleteEventMember(int memberid,int eventid);
        Task<IEnumerable<EventMember>> GetMemberIdsByEventId(int eventId);
    }
}
