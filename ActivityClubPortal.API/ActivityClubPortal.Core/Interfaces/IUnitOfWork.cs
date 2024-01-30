using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityClubPortal.Repositories;

namespace ActivityClubPortal.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository Users { get; }
        IUserRoleRepository UserRoles { get; }
        IGuideRepository Guides { get; }
        IEventRepository Events { get; }
        IMemberRepository Members { get; }
        IEventGuideRepository EventGuides { get; }
        IEventMemberRepository EventMembers { get; }
        ILookupRepository Lookups { get; }
        Task<int> CommitAsync();
    }
}
