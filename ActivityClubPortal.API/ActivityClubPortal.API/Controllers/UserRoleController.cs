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
    public class UserRoleController : ControllerBase
    {
        private readonly IUserRoleService _userRoleService;
        private readonly IMapper _mapper;

        public UserRoleController(IUserRoleService userRoleService, IMapper mapper)
        {
            _userRoleService = userRoleService;
            _mapper = mapper;
        }

        [HttpGet("GetuserRolesById/{id}")]
        public async Task<IActionResult> GetUserRolesById(int id)
        {
            var userRoles = await _userRoleService.GetUserRolesById(id);

            if (userRoles == null || !userRoles.Any())
            {
                return NotFound(); // Return 404 Not Found if no user roles are found
            }

            return Ok(userRoles);
        }

        [HttpGet("GetuserRolesByName/{name}")]
        public async Task<IActionResult> GetUserRolesByName(string name)
        {
            var userRoles = await _userRoleService.GetUserRolesByName(name);

            if (userRoles == null || !userRoles.Any())
            {
                return NotFound(); // Return 404 Not Found if no user roles are found
            }

            return Ok(userRoles);
        }

        [HttpGet("GetLatestUserRole")]
        public async Task<IActionResult> GetLatestUserRole()
        {
            try
            {
                var userRole = await _userRoleService.GetLatestUserRole();

                if (userRole == null)
                {
                    return NotFound(); // 404 Not Found
                }

                return Ok(userRole); // 200 OK with user data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost("CreateUserRole")]
        public async Task<IActionResult> AddUserRole([FromBody] UserRoleResource newUserRole)
        {
            try
            {
                if (newUserRole.UserRoleId <= 0)
                {
                    // Retrieve the latest user
                    var latestUserRole = await _userRoleService.GetLatestUserRole();

                    // Increment the UserId for the new user
                    newUserRole.UserRoleId = (latestUserRole?.UserRoleId ?? 0) + 1;
                }
                // Validate the input if needed
                var newuser = _mapper.Map<UserRoleResource, UserRole>(newUserRole);
                var addedUserRole = await _userRoleService.CreateUserRole(newuser);

                return CreatedAtAction(nameof(GetUserRolesById), new { id = addedUserRole.UserRoleId }, addedUserRole);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpDelete("DeleteUserRole/{id}")]
        public async Task<IActionResult> DeleteUserRole(int id)
        {
            try
            {
                var deleted = await _userRoleService.DeleteUserRole(id);

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

        [HttpDelete("DeleteSpecificUserRole/{userId}/{roleId}")]
        public async Task<IActionResult> DeleteSpecificUserRole(int userId, int roleId)
        {
            try
            {
                var deleted = await _userRoleService.DeleteSpecificUserRole(userId, roleId);

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


    }
}
