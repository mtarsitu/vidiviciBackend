using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using API_VidiVici.Model;
using API_VidiVici.Services;
using API_VidiVici.DTOs;
using Microsoft.EntityFrameworkCore;
using API_VidiVici.data;
using API_VidiVici.Modifiers;

namespace API_VidiVici.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountsController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly SignInManager<User> SignInManager;
        private readonly VidiviciDbContext _context;
      
        public AccountsController(
        UserManager<User> userManager, 
        TokenService tokenService, 
        SignInManager<User> signInManager,
        VidiviciDbContext context
        )
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _context = context;
            SignInManager = signInManager;

        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserLoginDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();
            //Request.Cookies.Append()

            var userLogged = new UserLoginDto
            {
                Username = user.UserName,
                Token = await _tokenService.GenerateToken(user)
            };
            await _userManager.AddClaimAsync(user, new Claim(loginDto.Username, userLogged.Token));

            //var signInStatus = await SignInManager.PasswordSignInAsync(user, loginDto.Password, true, lockoutOnFailure: false);
            Response.Cookies.Append("Token", userLogged.Token, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
            Response.Cookies.Append("Username", user.UserName, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
            //Response.Cookies.Append("X-Refresh-Token", user.RefreshToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });

            return userLogged;
        }

        [AllowAnonymous]
        [HttpPost("external")]
        public async Task<ActionResult<UserLoginDto>> External(ExternalLoginDto externalLoginDto)
        {
            var user = await _userManager.FindByEmailAsync(externalLoginDto.Email);
            if(user == null)
            {
                var newUser = new User{
                    UserName = externalLoginDto.Email, 
                    FirstName=externalLoginDto.FirstName,
                    LastName=externalLoginDto.LastName,Email = externalLoginDto.Email, 
                    UserRole=UserRole.Prospect };

                var result = await _userManager.CreateAsync(newUser);
                if(result.Succeeded){
                    result = await _userManager.AddToRoleAsync(newUser, newUser.UserRole);
                    if(result.Succeeded){
                        var userLogged = new UserLoginDto
                        { 
                            Username = newUser.UserName,
                            Token = await _tokenService.GenerateToken(newUser)
                        };
                        if(result.Succeeded)
                        {
                            result = await _userManager.AddClaimAsync(newUser, new Claim(userLogged.Username,userLogged.Token));
                            if(result.Succeeded){
                                Response.Cookies.Append("Token", userLogged.Token, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
                                Response.Cookies.Append("Username", newUser.UserName, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
                                // _context.SaveChanges();
                                return userLogged;
                            }
                        }
                    }
                }
            }
            var existentUser = new UserLoginDto{ Username = user.UserName, Token = await _tokenService.GenerateToken(user)};
            Response.Cookies.Append("Token", existentUser.Token, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
            Response.Cookies.Append("Username", user.UserName, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
            return existentUser;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            registerDto.UserRole =UserRole.Prospect;
            var user = new User { UserName = registerDto.Username, Email = registerDto.Email, UserRole=UserRole.Prospect };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }
            await _userManager.AddToRoleAsync(user,registerDto.UserRole );

            return StatusCode(201);
        }

        [Authorize(Roles = "Admin,Poweruser")]    
        [HttpPost("registerRole")]
        public async Task<ActionResult> RegisterWithRole(RegisterDto registerDto)
        {
            var userrole = char.ToUpper(registerDto.UserRole.ToLower()[0]) + registerDto.UserRole.Substring(1);
            var user = new User { 
                UserName = registerDto.Username,
                 Email = registerDto.Email, 
                 FirstName = registerDto.FirstName,
                 LastName = registerDto.LastName,
                 UserRole = userrole };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, registerDto.UserRole);

            return StatusCode(201);
        }

        [Authorize(Roles = "Admin,Investor,Prospect,Employee,Pending,Poweruser")]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            return new UserDto
            {
                Username = user.UserName,
                UserRole = user.UserRole,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email
                
            };
        }

        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        { 
            foreach (var cookie in Request.Cookies.Keys)
            {
                 Response.Cookies.Delete(cookie);
            }
            return Ok("");
        }

        [Authorize(Roles ="Admin, Poweruser")]
        [HttpPost("edit")]
        public async Task<ActionResult> EditUser(UserDto userDto)
        {
            var user = await _userManager.FindByIdAsync(userDto.Id);
            var oldRole =  char.ToUpper(user.UserRole.ToLower()[0]) + user.UserRole.Substring(1);
            var newRole = char.ToUpper(userDto.UserRole.ToLower()[0]) + userDto.UserRole.Substring(1);
            if(oldRole != newRole)
            {
                await _userManager.RemoveFromRoleAsync(user, oldRole);
                await _userManager.AddToRoleAsync(user, newRole);   
            }
            user.UserName = userDto.Username;
            user.UserRole = newRole;
            user.FirstName = userDto.FirstName;
            user.LastName = userDto.LastName;
            user.Email = userDto.Email;

            await _userManager.UpdateAsync(user);
            _context.SaveChanges();
            return Ok();
        }
    }
}