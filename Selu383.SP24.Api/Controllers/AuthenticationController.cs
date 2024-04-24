using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Extensions;
using Selu383.SP24.Api.Features.Authorization;

namespace Selu383.SP24.Api.Controllers
{
    [ApiController]
    [Route("api/authentication")]
    public class AuthenticationController : ControllerBase
    {
        private readonly SignInManager<User> signInManager;
        private readonly UserManager<User> userManager;

        public AuthenticationController(
            SignInManager<User> signInManager,
            UserManager<User> userManager)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<ActionResult<UserDto>> Me()
        {
            var username = User.GetCurrentUserName();
            var user = await userManager.FindByNameAsync(username);
            if (user == null)
            {
                return NotFound("User not found");
            }
            var resultDto = await GetUserDto(user);
            return Ok(resultDto);
        }

        [HttpPost("login")]
        [AllowAnonymous] 
        public async Task<ActionResult<UserDto>> Login(LoginDto dto)
        {
            var user = await userManager.FindByNameAsync(dto.UserName);
            if (user == null)
            {
                return BadRequest("No such user");
            }
            var result = await signInManager.CheckPasswordSignInAsync(user, dto.Password, true);
            if (!result.Succeeded)
            {
                return BadRequest("Invalid password");
            }

            await signInManager.SignInAsync(user, false);

            var resultDto = await GetUserDto(user);
            return Ok(resultDto);
        }

        [HttpPost("logout")]
        [Authorize] 
        public async Task<ActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Ok();
        }

        private async Task<UserDto> GetUserDto(User user)
        {
            var roles = await userManager.GetRolesAsync(user);
            return new UserDto
            {
                Id = user.Id,
                UserName = user.UserName!,
                Roles = roles.ToArray()
            };
        }
    }
}
