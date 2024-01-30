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
    public class EventService : IEventService
    {
        private readonly IUnitOfWork _unitOfWork;
        public EventService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<Event> CreateEvent(Event newEvent)
        {
            await _unitOfWork.Events.AddEventAsync(newEvent);
            await _unitOfWork.CommitAsync();
            return newEvent;
        }

        public async Task<Event> DeleteEvent(int id)
        {
            var eventToBeDeleted = await _unitOfWork.Events.GetByIdAsync(id);
            if (eventToBeDeleted != null)
            {
                await _unitOfWork.Events.DeleteEventAsync(id);
            }
            return eventToBeDeleted;
        }

        public async Task<IEnumerable<Event>> GetAllEvents()
        {
            return await _unitOfWork.Events
                .GetAllEventsAsync();
        }

        public async Task<Event> GetEventById(int id)
        {
            return await _unitOfWork.Events
                .GetEventsByIdAsync(id);
        }

        public async Task<Event> GetEventByName(string name)
        {
            return await _unitOfWork.Events
                .GetEventsByNameAsync(name);
        }

        public async Task<Event> GetLatestEvent()
        {
            return await _unitOfWork.Events.GetLatestEventAsync();
        }

        public async Task<List<Event>> GetEventsByStatus(bool isActive)
        {
            return await _unitOfWork.Events.GetEventsByStatusAsync(isActive);
        }

        public async Task<List<Event>> GetEventsByCost()
        {
            return await _unitOfWork.Events.GetEventsByCostAsync();
        }
        public async Task<List<Event>> GetEventsByDate()
        {
            return await _unitOfWork.Events.GetEventsByDateAsync();
        }
        public async Task<List<Event>> GetActiveEventsByDate()
        {
            return await _unitOfWork.Events.GetActiveEventsByDateAsync();
        }
        public async Task<Event> UpdateEventStatus(Event existingUpdated)
        {
            return await _unitOfWork.Events.UpdateEventStatusAsync(existingUpdated);
        }
        public async Task<Event> UpdateEvent(Event existingUpdated, Event updatedEvent)
        {
            return await _unitOfWork.Events.UpdateEventAsync(existingUpdated, updatedEvent);
        }
    }
}
