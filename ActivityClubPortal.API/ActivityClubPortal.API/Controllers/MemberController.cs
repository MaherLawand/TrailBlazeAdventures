using ActivityClubPortal.Core.Repository.Models;
using ActivityClubPortal.Services.Resources;
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
    public class MemberController : ControllerBase
    {
        private readonly IMemberService _memberService;
        private readonly IMapper _mapper;

        public MemberController(IMemberService memberService, IMapper mapper)
        {
            _memberService = memberService;
            _mapper = mapper;
        }

        [HttpGet("GetMemberById/{id}")]
        public async Task<IActionResult> GetMemberById(int id)
        {
            try
            {
                var member = await _memberService.GetMemberById(id);

                if (member == null)
                {
                    return NotFound(); // 404 Not Found
                }

                return Ok(member); // 200 OK with user data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost("AddMember")]
        public async Task<IActionResult> AddMember([FromForm] MemberResource newMember)
        {
            try
            {
                var existingMember = await _memberService.GetMemberById(newMember.MemberId);

                if (existingMember != null)
                {
                    // Member with the same name already exists
                    return Conflict(new { Message = "Already a member" });
                }

                // Validate the input if needed
                var newmember = _mapper.Map<MemberResource, Member>(newMember);
                if (newMember.Photo != null && newMember.Photo.Length > 0)
                {
                    // Set the maximum allowed size in bytes (e.g., 200 KB)
                    const int maxAllowedSizeBytes = 200 * 1024;

                    if (newMember.Photo.Length > maxAllowedSizeBytes)
                    {
                        return BadRequest(new { Message = "Image size exceeds the maximum allowed size (200 KB)." });
                    }

                    using (var memoryStream = new MemoryStream())
                    {
                        await newMember.Photo.CopyToAsync(memoryStream);
                        var imageBytes = memoryStream.ToArray();

                        // Convert the image bytes to Base64 string
                        newmember.Photo = Convert.ToBase64String(imageBytes);
                    }
                }
                var addedMember = await _memberService.CreateMember(newmember);
                
                return CreatedAtAction(nameof(GetMemberById), new { id = addedMember.MemberId }, addedMember);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPut("UpdateMemberById/{id}", Name = "UpdateMemberById")]
        public async Task<IActionResult> UpdateMemberById(int id, [FromBody] MemberResource newMember)
        {
            try
            {
                // Validate the input if needed

                var existingMember = await _memberService.GetMemberById(id);

                if (existingMember == null)
                {
                    return NotFound(); // 404 Not Found if member with specified ID is not found
                }
                var newmember = _mapper.Map<MemberResource, Member>(newMember);
                // Call the service to save the changes
                var updatedMemberResult = await _memberService.UpdateMember(existingMember, newmember);

                return Ok(updatedMemberResult); // 200 OK with updated event data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }


        [HttpDelete("DeleteMemberById/{id}")]
        public async Task<IActionResult> DeleteMember(int id)
        {
            try
            {
                var deleted = await _memberService.DeleteMember(id);

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

        [HttpGet]
        public async Task<IActionResult> GetAllMembers()
        {
            try
            {
                var members = await _memberService.GetAllMembers();

                return Ok(members); // 200 OK with a list of users
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
