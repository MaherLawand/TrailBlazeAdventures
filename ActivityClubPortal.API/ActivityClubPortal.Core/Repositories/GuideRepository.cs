using System;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository;
using ActivityClubPortal.Core.Repository.Models;
using ActivityClubPortal.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ActivityClubPortal.Repositories
{
    public class GuideRepository : Repository<Guide>, IGuideRepository
    {
        public GuideRepository(ActivityClubPortalDbContext context)
            : base(context)
        { }

        public async Task<IEnumerable<Guide>> GetAllGuidesAsync()
        {
            return await MyDbContext.Guides.ToListAsync();
        }

        public Task<Guide> GetGuidesByIdAsync(int id)
        {
            return MyDbContext.Guides.SingleOrDefaultAsync(a => a.GuideId == id);
        }

        public async Task AddGuideAsync(Guide guide)
        {
            if (guide == null)
            {
                throw new ArgumentNullException(nameof(guide));
            }

            await MyDbContext.Guides.AddAsync(guide);
            await MyDbContext.SaveChangesAsync();
        }

        public async Task UpdateGuideAsync(Guide guide)
        {
            if (guide == null)
            {
                throw new ArgumentNullException(nameof(guide));
            }

            MyDbContext.Entry(guide).State = EntityState.Modified;
            await MyDbContext.SaveChangesAsync();
        }

        public async Task DeleteGuideAsync(int id)
        {
            var guide = await MyDbContext.Guides
                .SingleOrDefaultAsync(a => a.GuideId == id);

            if (guide != null)
            {
                MyDbContext.Guides.Remove(guide);
                await MyDbContext.SaveChangesAsync();
            }
        }

        private ActivityClubPortalDbContext MyDbContext => Context as ActivityClubPortalDbContext;
    }
}
