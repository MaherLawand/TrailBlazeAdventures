using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository.Models;

namespace ClassLibrary2.Services.Interfaces
{
    public interface ILookupService
    {
        Task<IEnumerable<Lookup>> GetAllLookups();
        Task<Lookup> GetLookupById(int id);
        Task<Lookup> CreateLookup(Lookup newLookup);
        Task UpdateLookup(Lookup lookupToBeUpdated, Lookup lookup);
        Task<Lookup> DeleteLookup(int id);
    }
}
