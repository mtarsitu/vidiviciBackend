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
        TokenService tokenService, SignInManager<User> signInManager, 
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
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();
            //Request.Cookies.Append()

            var userLogged = new UserDto
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

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User { UserName = registerDto.Username, Email = registerDto.Email };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.GenerateToken(user)
            };
        }

        // [Authorize(Roles = "Admin")]
        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
             
            foreach (var cookie in Request.Cookies.Keys)
            {
                Response.Cookies.Delete(cookie);
            }
            return Ok("");
        }

        // [Authorize(Roles = "Admin")]
        // [Authorize(Roles = "Investor")]

        [HttpGet("getUserAndInvestments")]
        public async Task<ActionResult<InvestorDto>> GetUserAndInvestments(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            var actualUser = InvestorModifier.GetInvestorDto(user);
            var Investments = await _context.Investments
            .Include(t=> t.InvestmentType)
            .Where(x=>x.ClientId == user.Id)
            .ToListAsync();
            actualUser.Investments = new List<InvestmentDto>();
            
            foreach(Investment investment in Investments){
                actualUser.Investments.Add(InvestmentModifier.ToInvestmentDto(investment));
            }
            return actualUser;
        }
        

    
    }
}