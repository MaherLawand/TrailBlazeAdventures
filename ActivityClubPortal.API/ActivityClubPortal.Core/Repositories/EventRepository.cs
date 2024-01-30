using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityClubPortal.Core.Repository;
using ActivityClubPortal.Core.Repository.Models;
using ActivityClubPortal.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ActivityClubPortal.Repositories
{
    public class EventRepository : Repository<Event>, IEventRepository
    {
        public EventRepository(ActivityClubPortalDbContext context)
            : base(context)
        { }

        public async Task<IEnumerable<Event>> GetAllEventsAsync()
        {
            return await MyDbContext.Events.ToListAsync();
        }

        public Task<Event> GetEventsByIdAsync(int id)
        {
            return MyDbContext.Events.SingleOrDefaultAsync(a => a.EventId == id);
        }

        public Task<Event> GetEventsByNameAsync(string name)
        {
            return MyDbContext.Events.SingleOrDefaultAsync(a => a.EventName == name);
        }

        public Task<Event> GetLatestEventAsync()
        {
            return MyDbContext.Events
                .OrderByDescending(ur => ur.EventId)
                .FirstOrDefaultAsync();
        }

        public Task<List<Event>> GetEventsByStatusAsync(bool isActive)
        {
            return MyDbContext.Events
                .Where(e => e.EventStatus == isActive)
                .ToListAsync();
        }

        public Task<List<Event>> GetEventsByCostAsync()
        {
            return MyDbContext.Events
                .OrderByDescending(e => e.Cost)
                .ToListAsync();
        }

        public Task<List<Event>> GetEventsByDateAsync()
        {
            return MyDbContext.Events
                .OrderByDescending(e => e.DateFrom)
                .ToListAsync();
        }
        public Task<List<Event>> GetActiveEventsByDateAsync()
        {
            return MyDbContext.Events
                .Where(e=>e.EventStatus==true)
                .OrderByDescending(e => e.DateFrom)
                .ToListAsync();
        }
        public async Task<Event> UpdateEventAsync(Event existingEvent, Event updatedEvent)
        {
            if (existingEvent == null)
            {
                throw new ArgumentNullException(nameof(existingEvent));
            }

            // Update the user properties
            //existingEvent.EventId = updatedEvent.EventId;
            existingEvent.LookupId = updatedEvent.LookupId;
            existingEvent.Cost = updatedEvent.Cost;
            existingEvent.DateFrom = updatedEvent.DateFrom;
            existingEvent.DateTo = updatedEvent.DateTo;
            existingEvent.Description = updatedEvent.Description;
            existingEvent.Destination = updatedEvent.Destination;
            existingEvent.EventName = updatedEvent.EventName;
            existingEvent.EventStatus = updatedEvent.EventStatus;
            existingEvent.Photo = updatedEvent.Photo;

            MyDbContext.Entry(existingEvent).State = EntityState.Modified;
            await MyDbContext.SaveChangesAsync();
            return updatedEvent;
        }

        public async Task<Event> UpdateEventStatusAsync(Event existingEvent)
        {
            if (existingEvent == null)
            {
                throw new ArgumentNullException(nameof(existingEvent));
            }

            // Toggle the status
            existingEvent.EventStatus = (bool)existingEvent.EventStatus ? false : true;

            MyDbContext.Entry(existingEvent).State = EntityState.Modified;
            await MyDbContext.SaveChangesAsync();
            return existingEvent;
        }





        public async Task AddEventAsync(Event eventt)
        {
            if (eventt == null)
            {
            throw new ArgumentNullException(nameof(eventt));
        }

        await MyDbContext.Events.AddAsync(eventt);
        await MyDbContext.SaveChangesAsync();
        }

    public async Task DeleteEventAsync(int id)
    {
        var eventt = await MyDbContext.Events
            .SingleOrDefaultAsync(a => a.EventId == id);

        if (eventt != null)
            {
            MyDbContext.Events.Remove(eventt);
            await MyDbContext.SaveChangesAsync();
        }
    }

    private ActivityClubPortalDbContext MyDbContext
        {
            get { return Context as ActivityClubPortalDbContext; }
        }
    }
}
