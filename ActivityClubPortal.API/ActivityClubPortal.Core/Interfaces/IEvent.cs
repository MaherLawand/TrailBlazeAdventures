using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository.Models;

namespace ActivityClubPortal.Interfaces
{
    public interface IEventRepository : IRepository<Event>
    {
        Task<IEnumerable<Event>> GetAllEventsAsync();
        Task<Event> GetEventsByIdAsync(int id);
        Task<Event> GetLatestEventAsync();
        Task<Event> GetEventsByNameAsync(string name);
        Task AddEventAsync(Event eventt);
        Task DeleteEventAsync(int id);
        Task<List<Event>> GetEventsByStatusAsync(bool status);
        Task<List<Event>> GetEventsByCostAsync();
        Task<List<Event>> GetEventsByDateAsync();
        Task<List<Event>> GetActiveEventsByDateAsync();
        Task<Event> UpdateEventStatusAsync(Event eventt);
        Task<Event> UpdateEventAsync(Event existingEvent, Event updatedEvent);

    }
}
