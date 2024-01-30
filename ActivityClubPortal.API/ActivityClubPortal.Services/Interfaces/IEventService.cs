using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository.Models;

namespace ClassLibrary2.Services.Interfaces
{
    public interface IEventService
    {
        Task<IEnumerable<Event>> GetAllEvents();
        Task<Event> GetEventById(int id);
        Task<Event> GetEventByName(string name);
        Task<Event> GetLatestEvent();
        Task<Event> CreateEvent(Event newEvent);
        Task<Event> DeleteEvent(int id);
        Task<List<Event>> GetEventsByStatus(bool isActive);
        Task<List<Event>> GetEventsByCost();
        Task<List<Event>> GetEventsByDate();
        Task<List<Event>> GetActiveEventsByDate();
        Task<Event> UpdateEventStatus(Event existingUpdated);
        Task<Event> UpdateEvent(Event existingUpdated, Event updatedEvent);
    }
}
