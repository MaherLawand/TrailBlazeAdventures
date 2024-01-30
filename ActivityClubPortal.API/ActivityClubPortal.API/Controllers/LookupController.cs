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
    public class LookupController : ControllerBase
    {
        private readonly ILookupService _lookupService;

        public LookupController(ILookupService lookupService)
        {
            _lookupService = lookupService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLookupById(int id)
        {
            try
            {
                var lookup = await _lookupService.GetLookupById(id);

                if (lookup == null)
                {
                    return NotFound(); // 404 Not Found
                }

                return Ok(lookup); // 200 OK with user data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddLookup([FromBody] Lookup newLookup)
        {
            try
            {
                // Validate the input if needed

                var addedLookup = await _lookupService.CreateLookup(newLookup);

                return CreatedAtAction(nameof(GetLookupById), new { id = addedLookup.LookupId }, addedLookup);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLookup(int id)
        {
            try
            {
                var deleted = await _lookupService.DeleteLookup(id);

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
        public async Task<IActionResult> GetAllLookups()
        {
            try
            {
                var lookups = await _lookupService.GetAllLookups();

                return Ok(lookups); // 200 OK with a list of users
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
