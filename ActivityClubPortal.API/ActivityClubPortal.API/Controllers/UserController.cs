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
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IUserRoleService _userRoleService;
        private readonly IMapper _mapper;
        public UserController(IUserService userService, IUserRoleService userRoleService, IMapper mapper)
        {
            _userService = userService;
            _userRoleService = userRoleService;
            _mapper = mapper;
        }

        [HttpGet("GetUserById/{id}", Name = "GetUserById")]
        public async Task<IActionResult> GetUserById(int id)
        {
            try
            {
                var user = await _userService.GetUserById(id);

                if (user == null)
                {
                    return NotFound(); // 404 Not Found
                }

                return Ok(user); // 200 OK with user data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("GetUserByEmail/{email}", Name = "GetUserByEmail")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            try
            {
                var user = await _userService.GetUserByEmail(email);

                if (user == null)
                {
                    return NotFound(); // 404 Not Found
                }

                return Ok(user); // 200 OK with user data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("GetLatestUser")]
        public async Task<IActionResult> GetLatestUser()
        {
            try
            {
                var user = await _userService.GetLatestUser();

                if (user == null)
                {
                    return NotFound(); // 404 Not Found
                }

                return Ok(user); // 200 OK with user data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpPost("CreateUser")]
        public async Task<IActionResult> AddUser([FromBody] User newUser)
        {
            try
            {
                // Check if a user with the same email already exists
                var existingUser = await _userService.GetUserByEmail(newUser.Email);

                if (existingUser != null)
                {
                    // User with the same email already exists
                    return Conflict(new { Message = "User with the specified email already exists." });
                }

                // If userId is provided in the request body, use that value
                if (newUser.UserId <= 0)
                {
                    // Retrieve the latest user
                    var latestUser = await _userService.GetLatestUser();

                    // Increment the UserId for the new user
                    newUser.UserId = (latestUser?.UserId ?? 0) + 1;
                }

                // If you want to use transactions, consider using a transaction scope
                // using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
                // {
                //    // Your database operations here
                //    scope.Complete();
                // }

                // If the user doesn't exist, proceed to create a new user
                var addedUser = await _userService.CreateUser(newUser);

                // Retrieve the latest user role
                var latestUserRole = await _userRoleService.GetLatestUserRole();

                // Create a new user role
                UserRoleResource newUserRole = new UserRoleResource
                {
                    UserRoleId = (latestUserRole?.UserRoleId ?? 0) + 1,
                    RoleName = "Viewer",
                    RoleId = 0,
                    UserId = addedUser.UserId
                };

                var newuser = _mapper.Map<UserRoleResource, UserRole>(newUserRole);

                // Create the new user role
                var addedUserRole = await _userRoleService.CreateUserRole(newuser);

                // Return a 201 Created response with the created user data
                return CreatedAtAction(nameof(GetUserById), new { id = addedUser.UserId }, addedUser);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }



        [HttpPut("UpdateUserById/{id}", Name = "UpdateUserById")]
        public async Task<IActionResult> UpdateUserById(int id, [FromBody] User updatedUser)
        {
            try
            {
                // Validate the input if needed

                var existingUser = await _userService.GetUserById(id);

                if (existingUser == null)
                {
                    return NotFound(); // 404 Not Found if user with specified ID is not found
                }

                // Call the service to save the changes
                var updatedUserResult = await _userService.UpdateUser(existingUser, updatedUser);

                return Ok(updatedUserResult); // 200 OK with updated user data
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }



        [HttpDelete("DeleteUserById/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                var deleted = await _userService.DeleteUser(id);

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

       [HttpGet("GetAllUsers")]
       public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _userService.GetAllUsers();

                return Ok(users); // 200 OK with a list of users
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
