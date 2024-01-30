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
    public class EventMemberService : IEventMemberService
    {
        private readonly IUnitOfWork _unitOfWork;
        public EventMemberService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<EventMember> CreateEventMember(EventMember newEventMember)
        {
            await _unitOfWork.EventMembers.AddAsync(newEventMember);
            await _unitOfWork.CommitAsync();
            return newEventMember;
        }

        public async Task<EventMember> DeleteEventMember(int memberid, int eventid)
        {
            var eventmemberToBeDeleted = await _unitOfWork.EventMembers.GetByMemberandEventId(memberid,eventid);
            if (eventmemberToBeDeleted != null)
            {
                await _unitOfWork.EventMembers.DeleteEventMemberAsync(memberid,eventid);
            }
            return eventmemberToBeDeleted;
        }

        public async Task<IEnumerable<EventMember>> GetAllEventMembers()
        {
            return await _unitOfWork.EventMembers
                .GetAllEventMembersAsync();
        }
        public async Task<IEnumerable<EventMember>> GetMemberIdsByEventId(int eventId)
        {
            return await _unitOfWork.EventMembers.GetMemberIdsByEventIdAsync(eventId);
        }

        public async Task<IEnumerable<EventMember>> GetEventMemberById(int id)
        {
            return await _unitOfWork.EventMembers
                .GetEventMembersByIdAsync(id);
        }
        public async Task<EventMember> GetLatestEventMember()
        {
            return await _unitOfWork.EventMembers
                .GetLatestEventMemberAsync();
        }

        public async Task<EventMember> GetByMemberandEventId(int memberId, int eventId)
        {
            return await _unitOfWork.EventMembers.GetByMemberandEventId(memberId, eventId);
        }

        public async Task UpdateEventMember(EventMember eventMemberToBeUpdated, EventMember eventMember)
        {
            eventMemberToBeUpdated.EventMemberId = eventMember.EventMemberId;
            eventMemberToBeUpdated.EventId = eventMember.EventId;
            eventMemberToBeUpdated.MemberId = eventMember.MemberId;

            await _unitOfWork.CommitAsync();
        }
    }
}
