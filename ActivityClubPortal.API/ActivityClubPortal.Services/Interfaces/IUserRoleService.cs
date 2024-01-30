using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository.Models;

namespace ClassLibrary2.Services.Interfaces
{
    public interface IUserRoleService
    {
        Task<IEnumerable<UserRole>> GetUserRolesById(int id);
        Task<IEnumerable<UserRole>> GetUserRolesByName(string name);
        Task<UserRole> GetLatestUserRole();
        Task<UserRole> CreateUserRole(UserRole newUserRole);
        Task UpdateUserRole(UserRole userRoleToBeUpdated, UserRole userRole);
        Task<IEnumerable<UserRole>> DeleteUserRole(int id);
        Task<IEnumerable<UserRole>> DeleteSpecificUserRole(int userid,int roleid);
    }
}
