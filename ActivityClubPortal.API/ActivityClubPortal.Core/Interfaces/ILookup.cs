using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository.Models;

namespace ActivityClubPortal.Interfaces
{
    public interface ILookupRepository : IRepository<Lookup>
    {
        Task<IEnumerable<Lookup>> GetAllLookupsAsync();
        Task<Lookup> GetLookupsByIdAsync(int id);
        Task AddLookupAsync(Lookup lookup);
        Task UpdateLookupAsync(Lookup lookup);
        Task DeleteLookupAsync(int id);
    }
}
