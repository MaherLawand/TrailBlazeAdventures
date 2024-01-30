using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository.Models;

namespace ActivityClubPortal.Interfaces
{
    public interface IUserRoleRepository : IRepository<UserRole>
    {

        Task<IEnumerable<UserRole>> GetUserRolesByIdAsync(int id);
        Task<IEnumerable<UserRole>> GetUserRolesByNameAsync(string name);
        Task<UserRole> GetLatestUserRoleAsync();
        Task AddUserRoleAsync(UserRole userRole);
        Task UpdateUserRoleAsync(UserRole userRole);
        Task DeleteUserRoleAsync(int id);
        Task DeleteSpecificUserRoleAsync(int userid, int roleid);
    }
}
