using Deftility.Data.Models;
using Deftility.DTOs.Authentication;
using Deftility.DTOs.User;
using Deftility.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Deftility.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IOptions<JwtSettings> jwtSettings;

        public UserController(
            SignInManager<ApplicationUser> signInManager,
            UserManager<ApplicationUser> userManager,
            IOptions<JwtSettings> jwtSettings)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.jwtSettings = jwtSettings;
        }

        [HttpPost]
        public async Task<ActionResult<object>> Login(LoginUserDTO loginDto)
        {
            var user = userManager.Users.SingleOrDefault(u => u.UserName == loginDto.Username);

            if (user == null)
            {
                return BadRequest(new { error = "Invalid login credentials." });
            }

            var loginResult = await signInManager.PasswordSignInAsync(user, loginDto.Password, false, false);

            if (loginResult.Succeeded)
            {
                return new AuthenticationDTO
                {
                    Message = "Login successful.",
                    Token = GenerateJwtToken(user)
                };
            }

            return BadRequest(new { error = "Invalid login credentials." });
        }

        [HttpPost]
        public async Task<ActionResult<object>> Register(RegisterUserDTO registerDto)
        {
            if (userManager.Users.Any(u => u.Email == registerDto.Email))
            {
                return BadRequest(new { error = "Email is already in use." });
            }

            if (userManager.Users.Any(u => u.UserName == registerDto.Username))
            {
                return BadRequest(new { error = "Username is already in use." });
            }

            var user = new ApplicationUser
            {
                UserName = registerDto.Username,
                Email = registerDto.Email
            };

            var createUserResult = await userManager.CreateAsync(user, registerDto.Password);

            if (createUserResult.Succeeded)
            {
                var addToRoleResult = await userManager.AddToRoleAsync(user, "User");
                if (addToRoleResult.Succeeded)
                {
                    await signInManager.SignInAsync(user, false);

                    return new AuthenticationDTO
                    {
                        Message = "Registration successful.",
                        Token = GenerateJwtToken(user)
                    };
                }
            }

            return BadRequest(new { error = "Registration failed." });
        }

        private string GenerateJwtToken(ApplicationUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtSettings.Value.Secret);

            var userRole = userManager.IsInRoleAsync(user, "Admin").GetAwaiter().GetResult()
                ? "Admin" : "User";

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Role, userRole)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
