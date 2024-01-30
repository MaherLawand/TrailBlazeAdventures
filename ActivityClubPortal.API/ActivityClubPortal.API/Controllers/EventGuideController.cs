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
    public class EventGuideController : ControllerBase
    {
        private readonly IEventGuideService _eventguideService;
        private readonly IMapper _mapper;
        public EventGuideController(IEventGuideService eventguideService,IMapper mapper)
        {
            _eventguideService = eventguideService;
            _mapper = mapper;
        }

        [HttpGet("GetEventGuideById/{id}")]
        public async Task<IActionResult> GetEventGuideById(int id)
        {
            try
            {
                var eventguide = await _eventguideService.GetEventGuideById(id);

                if (eventguide == null)
                {
                    return NotFound(); // 404 Not Found
                }

                return Ok(eventguide); // 200 OK with user data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("GetLatestEventGuide")]
        public async Task<IActionResult> GetLatestEventGuide()
        {
            try
            {
                var eventguide = await _eventguideService.GetLatestEventGuide();

                if (eventguide == null)
                {
                    return NotFound(); // 404 Not Found
                }

                return Ok(eventguide); // 200 OK with user data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");

            }
        }

        [HttpGet("GetEventIdsByGuideId/{id}")]
        public async Task<IActionResult> GetEventIdsByGuideId(int id)
        {
            try
            {
                var eventguide = await _eventguideService.GetEventIdsByGuideId(id);

                if (eventguide == null)
                {
                    return NotFound(); // 404 Not Found
                }

                return Ok(eventguide); // 200 OK with user data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("GetGuideIdsByEventId/{id}")]
        public async Task<IActionResult> GetGuideIdsByEventId(int id)
        {
            try
            {
                var eventguide = await _eventguideService.GetGuideIdsByEventId(id);

                if (eventguide == null)
                {
                    return NotFound(); // 404 Not Found
                }

                return Ok(eventguide); // 200 OK with user data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("GetByGuideandEventId/{guideid}/{eventid}")]
        public async Task<IActionResult> GetByGuideandEventId(int guideid, int eventid)
        {
            try
            {
                var eventguide = await _eventguideService.GetByGuideandEventId(guideid, eventid);

                if (eventguide == null)
                {
                    return NotFound(); // 404 Not Found
                }

                return Ok(eventguide); // 200 OK with user data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }


        [HttpPost("AddEventGuide")]
        public async Task<IActionResult> AddEventGuide([FromBody] EventGuideResource newEventGuide)
        {
            try
            {
                var existingEventGuide = await _eventguideService.GetByGuideandEventId(newEventGuide.GuideId, newEventGuide.EventId);

                if (existingEventGuide != null)
                {
                    return Conflict(new { Message = "Already a guide for this event." });
                }

                /* if (newEventGuide.EventGuideId <= 0)
                {
                    // Retrieve the latest EventGuide
                    var latestEventGuide = await _eventguideService.GetLatestEventGuide();
                    Console.WriteLine("Latest Event Guide: " + latestEventGuide);
                    // Increment the EventGuideId for the new EventGuide
                    newEventGuide.EventGuideId = (latestEventGuide?.EventGuideId ?? 0) + 1;
                } */
                // Validate the input if needed
                var neweventguide = _mapper.Map<EventGuideResource, EventGuide>(newEventGuide);
                var addedEventGuide = await _eventguideService.CreateEventGuide(neweventguide);

                return CreatedAtAction(nameof(GetEventGuideById), new { id = addedEventGuide.EventGuideId }, addedEventGuide);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpDelete("DeleteEventGuide/{guideid}/{eventid}")]
        public async Task<IActionResult> DeleteEventGuide(int guideid,int eventid)
        {
            try
            {
                var deleted = await _eventguideService.DeleteEventGuide(guideid,eventid);

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

        [HttpGet("GetAllEventGuides")]
        public async Task<IActionResult> GetAllEventGuides()
        {
            try
            {
                var eventguides = await _eventguideService.GetAllEventGuides();

                return Ok(eventguides); // 200 OK with a list of users
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
