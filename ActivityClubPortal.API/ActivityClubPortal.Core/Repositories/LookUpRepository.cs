using System;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository;
using ActivityClubPortal.Core.Repository.Models;
using ActivityClubPortal.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ActivityClubPortal.Repositories
{
    public class LookupRepository : Repository<Lookup>, ILookupRepository
    {
        public LookupRepository(ActivityClubPortalDbContext context)
            : base(context)
        { }

        public async Task<IEnumerable<Lookup>> GetAllLookupsAsync()
        {
            return await MyDbContext.Lookups.ToListAsync();
        }

        public Task<Lookup> GetLookupsByIdAsync(int id)
        {
            return MyDbContext.Lookups.SingleOrDefaultAsync(a => a.LookupId == id);
        }

        public async Task AddLookupAsync(Lookup lookup)
        {
            if (lookup == null)
            {
                throw new ArgumentNullException(nameof(lookup));
            }

            await MyDbContext.Lookups.AddAsync(lookup);
            await MyDbContext.SaveChangesAsync();
        }

        public async Task UpdateLookupAsync(Lookup lookup)
        {
            if (lookup == null)
            {
                throw new ArgumentNullException(nameof(lookup));
            }

            MyDbContext.Entry(lookup).State = EntityState.Modified;
            await MyDbContext.SaveChangesAsync();
        }

        public async Task DeleteLookupAsync(int id)
        {
            var lookup = await MyDbContext.Lookups
                .SingleOrDefaultAsync(a => a.LookupId == id);

            if (lookup != null)
            {
                MyDbContext.Lookups.Remove(lookup);
                await MyDbContext.SaveChangesAsync();
            }
        }

        private ActivityClubPortalDbContext MyDbContext => Context as ActivityClubPortalDbContext;
    }
}
