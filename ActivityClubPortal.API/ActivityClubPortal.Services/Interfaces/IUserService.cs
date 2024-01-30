using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository.Models;

namespace ClassLibrary2.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> GetUserById(int id);
        Task<User> GetUserByEmail(string email);
        Task<User> CreateUser(User newUser);
        Task<User> GetLatestUser();
        Task<User> UpdateUser(User existingUser,User updatedUser);
        Task<User> DeleteUser(int id);
    }
}
