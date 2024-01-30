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
    public class MemberService : IMemberService
    {
        private readonly IUnitOfWork _unitOfWork;
        public MemberService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<Member> CreateMember(Member newMember)
        {
            await _unitOfWork.Members.AddAsync(newMember);
            await _unitOfWork.CommitAsync();
            return newMember;
        }

        public async Task<Member> UpdateMember(Member existingUpdated, Member updatedMember)
        {
            return await _unitOfWork.Members.UpdateMemberAsync(existingUpdated, updatedMember);
        }

        public async Task<Member> DeleteMember(int id)
        {
            var memberToBeDeleted = await _unitOfWork.Members.GetByIdAsync(id);
            if (memberToBeDeleted != null)
            {
                await _unitOfWork.Members.DeleteMemberAsync(id);
            }
            return memberToBeDeleted;
        }

        public async Task<IEnumerable<Member>> GetAllMembers()
        {
            return await _unitOfWork.Members
                .GetAllMembersAsync();
        }

        public async Task<Member> GetMemberById(int id)
        {
            return await _unitOfWork.Members
                .GetMembersByIdAsync(id);
        }
    }
}
