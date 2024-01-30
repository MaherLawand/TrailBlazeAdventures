using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository.Models;

namespace ActivityClubPortal.Interfaces
{
    public interface IMemberRepository : IRepository<Member>
    {
        Task<IEnumerable<Member>> GetAllMembersAsync();
        Task<Member> GetMembersByIdAsync(int id);
        Task AddMemberAsync(Member member);
        Task DeleteMemberAsync(int id);
        Task<Member> UpdateMemberAsync(Member existingUpdated, Member updatedMember);

    }
}
