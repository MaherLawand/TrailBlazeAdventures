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
    public class GuideController : ControllerBase
    {
        private readonly IGuideService _guideService;
        private readonly IMapper _mapper;

        public GuideController(IGuideService guideService, IMapper mapper)
        {
            _guideService = guideService;
            _mapper = mapper;
        }

        [HttpGet("GetGuideById/{id}")]
        public async Task<IActionResult> GetGuideById(int id)
        {
            try
            {
                var guide = await _guideService.GetGuideById(id);

                if (guide == null)
                {
                    return NotFound(); // 404 Not Found
                }

                return Ok(guide); // 200 OK with user data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpPost("AddGuide")]
        public async Task<IActionResult> AddGuide([FromForm] GuideResource newGuide)
        {
            try
            {
                var existingGuide = await _guideService.GetGuideById(newGuide.GuideId);

                if (existingGuide != null)
                {
                    // Guide with the same ID already exists
                    return Conflict(new { Message = "Guide with the same ID already exists" });
                }

                var guide = _mapper.Map<GuideResource, Guide>(newGuide);

                // Process and save the photo as Base64, with a max size check
                if (newGuide.Photo != null && newGuide.Photo.Length > 0)
                {
                    // Set the maximum allowed size in bytes (e.g., 200 KB)
                    const int maxAllowedSizeBytes = 200 * 1024;

                    if (newGuide.Photo.Length > maxAllowedSizeBytes)
                    {
                        return BadRequest(new { Message = "Image size exceeds the maximum allowed size (200 KB)." });
                    }

                    using (var memoryStream = new MemoryStream())
                    {
                        await newGuide.Photo.CopyToAsync(memoryStream);
                        var imageBytes = memoryStream.ToArray();

                        // Convert the image bytes to Base64 string
                        guide.Photo = Convert.ToBase64String(imageBytes);
                    }
                }

                var addedGuide = await _guideService.CreateGuide(guide);

                return CreatedAtAction(nameof(GetGuideById), new { id = addedGuide.GuideId }, addedGuide);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }




        [HttpDelete("DeleteGuide/{id}")]
        public async Task<IActionResult> DeleteGuide(int id)
        {
            try
            {
                var deleted = await _guideService.DeleteGuide(id);

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

        [HttpGet("GetAllGuides")]
        public async Task<IActionResult> GetAllGuides()
        {
            try
            {
                var guides = await _guideService.GetAllGuides();

                return Ok(guides); // 200 OK with a list of users
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
