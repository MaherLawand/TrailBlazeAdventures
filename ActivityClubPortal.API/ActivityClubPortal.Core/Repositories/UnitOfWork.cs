using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository;
using ActivityClubPortal.Core.Repository.Models;
using ActivityClubPortal.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ActivityClubPortal.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ActivityClubPortalDbContext _context;
        private UserRepository? _userRepository;
        private UserRoleRepository? _userRoleRepository;
        private GuideRepository? _guideRepository;
        private EventRepository? _eventRepository;
        private MemberRepository? _memberRepository;
        private EventGuideRepository? _eventGuideRepository;
        private EventMemberRepository? _eventMemberRepository;
        private LookupRepository? _lookupRepository;

        // private ArtistRepository _artistRepository;

        public UnitOfWork(ActivityClubPortalDbContext context)
        {
            this._context = context;
        }

        public IUserRepository Users => _userRepository = _userRepository ?? new UserRepository(_context);
        public IUserRoleRepository UserRoles => _userRoleRepository = _userRoleRepository ?? new UserRoleRepository(_context);
        public IGuideRepository Guides => _guideRepository = _guideRepository ?? new GuideRepository(_context);
        public IEventRepository Events => _eventRepository = _eventRepository ?? new EventRepository(_context);
        public IMemberRepository Members => _memberRepository = _memberRepository ?? new MemberRepository(_context);
        public IEventGuideRepository EventGuides => _eventGuideRepository = _eventGuideRepository ?? new EventGuideRepository(_context);
        public IEventMemberRepository EventMembers => _eventMemberRepository = _eventMemberRepository ?? new EventMemberRepository(_context);
        public ILookupRepository Lookups => _lookupRepository = _lookupRepository ?? new LookupRepository(_context);
        // public IArtistRepository Artists => _artistRepository = _artistRepository ?? new ArtistRepository(_context);

        public async Task<int> CommitAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
