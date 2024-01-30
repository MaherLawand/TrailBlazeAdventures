using ActivityClubPortal.Core.Repository.Models;
using AutoMapper;
using ClassLibrary2.Services;
using ClassLibrary2.Services.Interfaces;
using ClassLibrary2.Services.Resources;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace WebApplication6.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;
        private readonly IMapper _mapper;
        public EventController(IEventService eventService,IMapper mapper)
        {
            _eventService = eventService;
            _mapper = mapper;
        }

        [HttpGet("GetEventById/{id}")]
        public async Task<IActionResult> GetEventById(int id)
        {
            try
            {
                var eventt = await _eventService.GetEventById(id);

                if (eventt == null)
                {
                    return NotFound(); // 404 Not Found
                }

                return Ok(eventt); // 200 OK with user data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("GetEventByName/{name}")]
        public async Task<IActionResult> GetEventByName(string name)
        {
            try
            {
                var eventt = await _eventService.GetEventByName(name);

                if (eventt == null)
                {
                    return NotFound(); // 404 Not Found
                }

                return Ok(eventt); // 200 OK with user data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpGet("GetEventsByStatus/{status}")]
        public async Task<IActionResult> GetEventsByStatus(bool status)
        {
            try
            {
                var events = await _eventService.GetEventsByStatus(status);
                if(events == null)
                {
                    return NotFound(); //404 Not Found
                }
                return Ok(events);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("GetLatestEvent")]
        public async Task<IActionResult> GetLatestEvent()
        {
            try
            {
                var eventt = await _eventService.GetLatestEvent();

                if (eventt == null)
                {
                    return NotFound(); // 404 Not Found
                }

                return Ok(eventt); // 200 OK with user data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("GetEventsByCost")]
        public async Task<IActionResult> GetEventsByCost()
        {
            try
            {
                var eventt = await _eventService.GetEventsByCost();

                if (eventt == null)
                {
                    return NotFound(); // 404 Not Found
                }

                return Ok(eventt); // 200 OK with user data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpGet("GetEventsByDate")]
        public async Task<IActionResult> GetEventsByDate()
        {
            try
            {
                var eventt = await _eventService.GetEventsByDate();

                if (eventt == null)
                {
                    return NotFound(); // 404 Not Found
                }

                return Ok(eventt); // 200 OK with user data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpGet("GetActiveEventsByDate")]
        public async Task<IActionResult> GetActiveEventsByDate()
        {
            try
            {
                var eventt = await _eventService.GetActiveEventsByDate();

                if (eventt == null)
                {
                    return NotFound(); // 404 Not Found
                }

                return Ok(eventt); // 200 OK with user data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost("AddEvent")]
        public async Task<IActionResult> AddEvent([FromForm] EventResource newEvent)
        {
            try
            {
                var existingEvent = await _eventService.GetEventByName(newEvent.EventName);

                if (existingEvent != null)
                {
                    // Event with the same name already exists
                    return Conflict(new { Message = "Event with the specified name already exists." });
                }
                if (newEvent.EventId <= 0)
                {
                    // Retrieve the latest event
                    var latestEvent = await _eventService.GetLatestEvent();

                    // Increment the EventId for the new event
                    newEvent.EventId = (latestEvent?.EventId ?? 0) + 1;
                }


                // Validate the input if needed
                var newevent = _mapper.Map<EventResource, Event>(newEvent);
                if (newEvent.Photo != null && newEvent.Photo.Length > 0)
                {
                    // Set the maximum allowed size in bytes (e.g., 200 KB)
                    const int maxAllowedSizeBytes = 500 * 1024;

                    if (newEvent.Photo.Length > maxAllowedSizeBytes)
                    {
                        return BadRequest(new { Message = "Image size exceeds the maximum allowed size (200 KB)." });
                    }

                    using (var memoryStream = new MemoryStream())
                    {
                        await newEvent.Photo.CopyToAsync(memoryStream);
                        var imageBytes = memoryStream.ToArray();

                        // Convert the image bytes to Base64 string
                        newevent.Photo = Convert.ToBase64String(imageBytes);
                    }
                }
                var addedEvent = await _eventService.CreateEvent(newevent);

                return CreatedAtAction(nameof(GetEventById), new { id = addedEvent.EventId }, addedEvent);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpDelete("DeleteEvent/{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            try
            {
                var deleted = await _eventService.DeleteEvent(id);

                if (deleted == null)
                {
                    return NotFound(); // 404 Not Found if the user with the given ID is not found
                }

                return NoContent(); // 204 No Content for successful deletion
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPut("UpdateEventById/{id}", Name = "UpdateEventById")]
        public async Task<IActionResult> UpdateEventById(int id, [FromForm] EventResource newEvent)
        {
            try
            {
                // Validate the input if needed

                var existingEvent = await _eventService.GetEventById(id);

                if (existingEvent == null)
                {
                    return NotFound(); // 404 Not Found if event with specified ID is not found
                }
                var newevent = _mapper.Map<EventResource, Event>(newEvent);
                if (newEvent.Photo != null && newEvent.Photo.Length > 0)
                {
                    // Set the maximum allowed size in bytes (e.g., 200 KB)
                    const int maxAllowedSizeBytes = 500 * 1024;

                    if (newEvent.Photo.Length > maxAllowedSizeBytes)
                    {
                        return BadRequest(new { Message = "Image size exceeds the maximum allowed size (200 KB)." });
                    }

                    using (var memoryStream = new MemoryStream())
                    {
                        await newEvent.Photo.CopyToAsync(memoryStream);
                        var imageBytes = memoryStream.ToArray();

                        // Convert the image bytes to Base64 string
                        newevent.Photo = Convert.ToBase64String(imageBytes);
                    }
                }
                // Call the service to save the changes
                var updatedEventResult = await _eventService.UpdateEvent(existingEvent, newevent);

                return Ok(updatedEventResult); // 200 OK with updated event data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }


        [HttpPut("UpdateEventStatusById/{id}", Name = "UpdateEventStatusById")]
        public async Task<IActionResult> UpdateEventStatusById(int id)
        {
            try
            {
                var existingEvent = await _eventService.GetEventById(id);

                if (existingEvent == null)
                {
                    return NotFound(); // 404 Not Found if event with specified ID is not found
                }

                // Call the service to save the changes
                var updatedEventResult = await _eventService.UpdateEventStatus(existingEvent);

                return Ok(updatedEventResult); // 200 OK with updated event data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }



        [HttpGet("GetAllEvents")]
        public async Task<IActionResult> GetAllEvents()
        {
            try
            {
                var events = await _eventService.GetAllEvents();

                return Ok(events); // 200 OK with a list of users
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
