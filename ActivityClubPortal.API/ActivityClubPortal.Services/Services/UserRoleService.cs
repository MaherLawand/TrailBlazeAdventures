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
    public class UserRoleService : IUserRoleService
    {
        private readonly IUnitOfWork _unitOfWork;
        public UserRoleService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<UserRole> CreateUserRole(UserRole newUserRole)
        {
            await _unitOfWork.UserRoles.AddAsync(newUserRole);
            await _unitOfWork.CommitAsync();
            return newUserRole;
        }

        public async Task<IEnumerable<UserRole>> DeleteUserRole(int id)
        {
            var userRoleToBeDeleted = await _unitOfWork.UserRoles
                .GetUserRolesByIdAsync(id);
            if (userRoleToBeDeleted != null)
            {
                await _unitOfWork.UserRoles.DeleteUserRoleAsync(id);
            }
            return userRoleToBeDeleted;
        }

        public async Task<IEnumerable<UserRole>> DeleteSpecificUserRole(int userid,int roleid)
        {
            var userRoleToBeDeleted = await _unitOfWork.UserRoles
                .GetUserRolesByIdAsync(userid);
            if (userRoleToBeDeleted != null)
            {
                await _unitOfWork.UserRoles.DeleteSpecificUserRoleAsync(userid,roleid);
            }
            return userRoleToBeDeleted;
        }

        public async Task<IEnumerable<UserRole>> GetUserRolesById(int id)
        {
            return await _unitOfWork.UserRoles
                .GetUserRolesByIdAsync(id);
        }
        public async Task<IEnumerable<UserRole>> GetUserRolesByName(string name)
        {
            return await _unitOfWork.UserRoles.GetUserRolesByNameAsync(name);
        }
        public async Task<UserRole> GetLatestUserRole()
        {
            return await _unitOfWork.UserRoles.GetLatestUserRoleAsync();
        }
        public async Task UpdateUserRole(UserRole userRoleToBeUpdated, UserRole userRole)
        {
            userRoleToBeUpdated.RoleName = userRole.RoleName;
            userRoleToBeUpdated.UserRoleId = userRole.UserRoleId;
            userRoleToBeUpdated.UserId = userRole.UserId;
            userRoleToBeUpdated.RoleId = userRole.RoleId;

            await _unitOfWork.CommitAsync();
        }
    }
}
