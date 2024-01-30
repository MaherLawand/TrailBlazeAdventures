using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository.Models;

namespace ClassLibrary2.Services.Interfaces
{
    public interface IMemberService
    {
        Task<IEnumerable<Member>> GetAllMembers();
        Task<Member> GetMemberById(int id);
        Task<Member> CreateMember(Member newMember);
        Task<Member> UpdateMember(Member memberToBeUpdated, Member member);
        Task<Member> DeleteMember(int id);
    }
}
