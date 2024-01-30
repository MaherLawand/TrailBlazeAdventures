using ActivityClubPortal.Core.Repository.Models;
using AutoMapper;
using ClassLibrary2.Services.Interfaces;
using ClassLibrary2.Services.Resources;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace WebApplication6.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventMemberController : ControllerBase
    {
        private readonly IEventMemberService _eventmemberService;
        private readonly IMapper _mapper;

        public EventMemberController(IEventMemberService eventmemberService,IMapper mapper)
        {
            _eventmemberService = eventmemberService;
            _mapper = mapper;
        }

        [HttpGet("GetEventMemberById/{id}")]
        public async Task<IActionResult> GetEventMemberById(int id)
        {
            try
            {
                var eventmember = await _eventmemberService.GetEventMemberById(id);

                if (eventmember == null)
                {
                    return NotFound(); // 404 Not Found
                }

                return Ok(eventmember); // 200 OK with user data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("GetMemberIdsByEventId/{id}")]
        public async Task<IActionResult> GetMemberIdsByEventId(int id)
        {
            try
            {
                var eventmember = await _eventmemberService.GetMemberIdsByEventId(id);

                if (eventmember == null)
                {
                    return NotFound(); // 404 Not Found
                }

                return Ok(eventmember); // 200 OK with user data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("GetByMemberandEventId/{memberid}/{eventid}")]
        public async Task<IActionResult> GetByMemberandEventId(int memberid,int eventid)
        {
            try
            {
                var eventmember = await _eventmemberService.GetByMemberandEventId(memberid,eventid);

                if (eventmember == null)
                {
                    return NotFound(); // 404 Not Found
                }

                return Ok(eventmember); // 200 OK with user data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("GetLatestEventMember")]
        public async Task<IActionResult> GetLatestEventMember()
        {
            try
            {
                var eventmember = await _eventmemberService.GetLatestEventMember();

                if (eventmember == null)
                {
                    return NotFound(); // 404 Not Found
                }

                return Ok(eventmember); // 200 OK with user data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost("AddEventMember")]
        public async Task<IActionResult> AddEventMember([FromBody] EventMemberResource newEventMember)
        {
            try
            {
                var existingEventMember = await _eventmemberService.GetByMemberandEventId(newEventMember.MemberId,newEventMember.EventId);

                if (existingEventMember != null)
                {               
                    return Conflict(new { Message = "Already a member of this event." });
                }

               /* if (newEventMember.EventMemberId <= 0)
                {
                    // Retrieve the latest EventMember
                    var latestEventMember = await _eventmemberService.GetLatestEventMember();

                    // Increment the EventMemberId for the new EventMember
                    newEventMember.EventMemberId = (latestEventMember?.EventMemberId ?? 0) + 1;
                } */
                // Validate the input if needed
                var neweventmember = _mapper.Map<EventMemberResource, EventMember>(newEventMember);
                var addedEventMember = await _eventmemberService.CreateEventMember(neweventmember);

                return CreatedAtAction(nameof(GetEventMemberById), new { id = addedEventMember.EventMemberId }, addedEventMember);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpDelete("DeleteEventMember/{memberid}/{eventid}")]
        public async Task<IActionResult> DeleteEventMember(int memberid,int eventid)
        {
            try
            {
                var deleted = await _eventmemberService.DeleteEventMember(memberid, eventid);

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

        [HttpGet("GetAllEventMembers")]
        public async Task<IActionResult> GetAllEventMembers()
        {
            try
            {
                var eventmembers = await _eventmemberService.GetAllEventMembers();

                return Ok(eventmembers); // 200 OK with a list of users
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
