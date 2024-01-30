using System;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository;
using ActivityClubPortal.Core.Repository.Models;
using ActivityClubPortal.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ActivityClubPortal.Repositories
{
    public class MemberRepository : Repository<Member>, IMemberRepository
    {
        public MemberRepository(ActivityClubPortalDbContext context)
            : base(context)
        { }

        public async Task<IEnumerable<Member>> GetAllMembersAsync()
        {
            return await MyDbContext.Members.ToListAsync();
        }

        public Task<Member> GetMembersByIdAsync(int id)
        {
            return MyDbContext.Members.SingleOrDefaultAsync(a => a.MemberId == id);
        }

        public async Task AddMemberAsync(Member member)
        {
            if (member == null)
            {
                throw new ArgumentNullException(nameof(member));
            }

            await MyDbContext.Members.AddAsync(member);
            await MyDbContext.SaveChangesAsync();
        }

        public async Task<Member> UpdateMemberAsync(Member existingMember, Member updatedMember)
        {
            if (existingMember == null)
            {
                throw new ArgumentNullException(nameof(existingMember));
            }

            // Update the user properties
            //existingMember.MemberId = updatedMember.MemberId;
            existingMember.FullName = updatedMember.FullName;
            existingMember.Email = updatedMember.Email;
            existingMember.Password = updatedMember.Password;
            existingMember.DateOfBirth = updatedMember.DateOfBirth;
            existingMember.Gender = updatedMember.Gender;
            existingMember.JoiningDate = updatedMember.JoiningDate;
            existingMember.MobileNumber = updatedMember.MobileNumber;
            existingMember.EmergencyNumber = updatedMember.EmergencyNumber;
            existingMember.Photo = updatedMember.Photo;
            existingMember.Profession = updatedMember.Profession;
            existingMember.Nationality = updatedMember.Nationality;

            MyDbContext.Entry(existingMember).State = EntityState.Modified;
            await MyDbContext.SaveChangesAsync();
            return updatedMember;
        }

        public async Task DeleteMemberAsync(int id)
        {
            var member = await MyDbContext.Members
                .SingleOrDefaultAsync(a => a.MemberId == id);

            if (member != null)
            {
                MyDbContext.Members.Remove(member);
                await MyDbContext.SaveChangesAsync();
            }
        }

        private ActivityClubPortalDbContext MyDbContext => Context as ActivityClubPortalDbContext;
    }
}
