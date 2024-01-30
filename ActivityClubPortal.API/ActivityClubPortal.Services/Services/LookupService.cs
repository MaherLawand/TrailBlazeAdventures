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
    public class LookupService : ILookupService
    {
        private readonly IUnitOfWork _unitOfWork;
        public LookupService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<Lookup> CreateLookup(Lookup newLookup)
        {
            await _unitOfWork.Lookups.AddAsync(newLookup);
            await _unitOfWork.CommitAsync();
            return newLookup;
        }

        public async Task<Lookup> DeleteLookup(int id)
        {
            var lookupToBeDeleted = await _unitOfWork.Lookups.GetByIdAsync(id);
            if (lookupToBeDeleted != null)
            {
                await _unitOfWork.Lookups.DeleteLookupAsync(id);
                await _unitOfWork.CommitAsync();
            }
            return lookupToBeDeleted;
        }

        public async Task<IEnumerable<Lookup>> GetAllLookups()
        {
            return await _unitOfWork.Lookups
                .GetAllLookupsAsync();
        }

        public async Task<Lookup> GetLookupById(int id)
        {
            return await _unitOfWork.Lookups
                .GetLookupsByIdAsync(id);
        }

        public async Task UpdateLookup(Lookup lookupToBeUpdated, Lookup lookup)
        {
            lookupToBeUpdated.LookupId = lookup.LookupId;
            lookupToBeUpdated.LookUpCode = lookup.LookUpCode;
            lookupToBeUpdated.LookUpName = lookup.LookUpName;
            lookupToBeUpdated.LookUpOrder = lookup.LookUpOrder;

            await _unitOfWork.CommitAsync();
        }
    }
}
