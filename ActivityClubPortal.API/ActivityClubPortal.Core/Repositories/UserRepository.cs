using System;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository;
using ActivityClubPortal.Core.Repository.Models;
using ActivityClubPortal.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ActivityClubPortal.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(ActivityClubPortalDbContext context)
            : base(context)
        { }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await MyDbContext.Users.ToListAsync();
        }

        public Task<User> GetUsersByIdAsync(int id)
        {
            return MyDbContext.Users.SingleOrDefaultAsync(a => a.UserId == id);
        }

        public Task<User> GetUserByEmailAsync(string email)
        {
            return MyDbContext.Users.SingleOrDefaultAsync(u => u.Email == email);
        }

        public async Task AddUserAsync(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            await MyDbContext.Users.AddAsync(user);
            await MyDbContext.SaveChangesAsync();

        }

        public async Task<User> UpdateUserAsync(User existingUser, User updatedUser)
        {
            if (existingUser == null)
            {
                throw new ArgumentNullException(nameof(existingUser));
            }

            // Update the user properties
            existingUser.Name = updatedUser.Name;
            existingUser.Email = updatedUser.Email;
            existingUser.Password = updatedUser.Password;
            existingUser.Gender = updatedUser.Gender;
            existingUser.DateOfBirth = updatedUser.DateOfBirth;// Update other properties as needed

            MyDbContext.Entry(existingUser).State = EntityState.Modified;
            await MyDbContext.SaveChangesAsync();
            return updatedUser;
        }

        public Task<User> GetLatestUserAsync()
        {
            return MyDbContext.Users
                .OrderByDescending(ur => ur.UserId)
                .FirstOrDefaultAsync();
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await MyDbContext.Users.SingleOrDefaultAsync(a => a.UserId == id);

            if (user != null)
            {
                // Delete related UserRoles
                var userRoles = await MyDbContext.UserRoles.Where(ur => ur.UserId == id).ToListAsync();
                MyDbContext.UserRoles.RemoveRange(userRoles);

                // Remove the user
                MyDbContext.Users.Remove(user);

                await MyDbContext.SaveChangesAsync();
            }
        }


        private ActivityClubPortalDbContext MyDbContext => Context as ActivityClubPortalDbContext;
    }
}
