using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository.Models;

namespace ActivityClubPortal.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUsersByIdAsync(int id);
        Task<User> GetUserByEmailAsync(string email);
        Task AddUserAsync(User user);
        Task<User> GetLatestUserAsync();
        Task<User> UpdateUserAsync(User exisitngUser,User updatedUser);
        Task DeleteUserAsync(int id);
    }
}
