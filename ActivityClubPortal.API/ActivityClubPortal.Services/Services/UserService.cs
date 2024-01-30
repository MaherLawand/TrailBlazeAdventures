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
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        public UserService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<User> CreateUser(User newUser)
        {
            await _unitOfWork.Users.AddAsync(newUser);
            await _unitOfWork.CommitAsync();
            return newUser;
        }

        public async Task<User> DeleteUser(int id)
        {
            var usertobedeleted = await _unitOfWork.Users
                .GetUsersByIdAsync(id);
            if(usertobedeleted != null)
            {
                await _unitOfWork.Users.DeleteUserAsync(id);
                await _unitOfWork.CommitAsync();
            }
            return usertobedeleted;

        }


        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _unitOfWork.Users
                .GetAllUsersAsync();
        }

        public async Task<User> GetUserById(int id)
        {
            return await _unitOfWork.Users
                .GetUsersByIdAsync(id);
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _unitOfWork.Users.GetUserByEmailAsync(email);
        }

        public async Task<User> UpdateUser(User existingUpdated,User updatedUser)  
        {
           return await _unitOfWork.Users.UpdateUserAsync(existingUpdated,updatedUser);
        }

        public async Task<User> GetLatestUser()
        {
            return await _unitOfWork.Users.GetLatestUserAsync();
        }
    }
}
