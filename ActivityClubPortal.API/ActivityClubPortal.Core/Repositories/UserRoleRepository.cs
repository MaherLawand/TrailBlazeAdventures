using System;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository;
using ActivityClubPortal.Core.Repository.Models;
using ActivityClubPortal.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ActivityClubPortal.Repositories
{
    public class UserRoleRepository : Repository<UserRole>, IUserRoleRepository
    {
        public UserRoleRepository(ActivityClubPortalDbContext context)
            : base(context)
        { }

        public async Task<IEnumerable<UserRole>> GetUserRolesByIdAsync(int userId)
        {
            return await MyDbContext.UserRoles
                .Where(a => a.UserId == userId)
                .ToListAsync();
        }
        public async Task<IEnumerable<UserRole>> GetUserRolesByNameAsync(string name)
        {
            return await MyDbContext.UserRoles.Where(a => a.RoleName == name)
                .ToListAsync();
        }
        public Task<UserRole> GetLatestUserRoleAsync()
        {
            return MyDbContext.UserRoles
                .OrderByDescending(ur => ur.UserRoleId)
                .FirstOrDefaultAsync();
        }



        public async Task AddUserRoleAsync(UserRole userRole)
        {
            if (userRole == null)
            {
                throw new ArgumentNullException(nameof(userRole));
            }

            await MyDbContext.UserRoles.AddAsync(userRole);
            await MyDbContext.SaveChangesAsync();
        }

        public async Task UpdateUserRoleAsync(UserRole userRole)
        {
            if (userRole == null)
            {
                throw new ArgumentNullException(nameof(userRole));
            }

            MyDbContext.Entry(userRole).State = EntityState.Modified;
            await MyDbContext.SaveChangesAsync();
        }

        public async Task DeleteUserRoleAsync(int id)
        {
            var userRoles = await MyDbContext.UserRoles
        .Where(a => a.UserId == id)
        .ToListAsync();

            if (userRoles != null && userRoles.Any())
            {
                MyDbContext.UserRoles.RemoveRange(userRoles);
                await MyDbContext.SaveChangesAsync();
            }
        }

        public async Task DeleteSpecificUserRoleAsync(int userid,int roleid)
        {
            var userRoles = await MyDbContext.UserRoles
        .Where(a => a.RoleId == roleid && a.UserId == userid)
        .ToListAsync();

            if (userRoles != null && userRoles.Any())
            {
                MyDbContext.UserRoles.RemoveRange(userRoles);
                await MyDbContext.SaveChangesAsync();
            }
        }

        private ActivityClubPortalDbContext MyDbContext => Context as ActivityClubPortalDbContext;
    }
}
