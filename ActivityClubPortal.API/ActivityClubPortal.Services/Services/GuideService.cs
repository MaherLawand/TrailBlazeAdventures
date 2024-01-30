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
    public class GuideService : IGuideService
    {
        private readonly IUnitOfWork _unitOfWork;
        public GuideService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<Guide> CreateGuide(Guide newGuide)
        {
            await _unitOfWork.Guides.AddAsync(newGuide);
            await _unitOfWork.CommitAsync();
            return newGuide;
        }

        public async Task<Guide> DeleteGuide(int id)
        {
            var guideToBeDeleted = await _unitOfWork.Guides.GetByIdAsync(id);
            if (guideToBeDeleted != null)
            {
                await _unitOfWork.Guides.DeleteGuideAsync(id);
            }
            return guideToBeDeleted;
        }

        public async Task<IEnumerable<Guide>> GetAllGuides()
        {
            return await _unitOfWork.Guides
                .GetAllGuidesAsync();
        }

        public async Task<Guide> GetGuideById(int id)
        {
            return await _unitOfWork.Guides
                .GetGuidesByIdAsync(id);
        }

        public async Task UpdateGuide(Guide guideToBeUpdated, Guide guide)
        {
            guideToBeUpdated.FullName = guide.FullName;
            guideToBeUpdated.Email = guide.Email;
            guideToBeUpdated.Password = guide.Password;
            guideToBeUpdated.DateOfBirth = guide.DateOfBirth;
            guideToBeUpdated.JoiningDate = guide.JoiningDate;
            guideToBeUpdated.Photo = guide.Photo;
            guideToBeUpdated.Profession = guide.Profession;

            await _unitOfWork.CommitAsync();
        }
    }
}
