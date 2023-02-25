using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using API_VidiVici.Model;
using API_VidiVici.Services;
using API_VidiVici.DTOs;
using Microsoft.AspNetCore.Authentication.Cookies;
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
        private readonly NotificationService _notificationService;
        private readonly TwoFactorServices _twoFactorService;
        private static string twoFactorPin;
        private static UserLoginDto userToPassTwoFactor;

        public AccountsController(
        UserManager<User> userManager, 
        TokenService tokenService, 
        NotificationService notificationService,
        SignInManager<User> signInManager,
        TwoFactorServices twoFactorService
        )
        {
            _tokenService = tokenService;
            _notificationService = notificationService;
            _userManager = userManager;
            _twoFactorService = twoFactorService;
            SignInManager = signInManager;
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromForm]LoginDto loginDto)
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
            var identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme);
            await _userManager.AddClaimAsync(user, new Claim(loginDto.Username, userLogged.Token));
            if(!user.TwoFactorEnabled)
            {
                //var signInStatus = await SignInManager.PasswordSignInAsync(user, loginDto.Password, true, lockoutOnFailure: false);
                Response.Cookies.Append("X-Authorization-token", userLogged.Token, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.None, Secure=true });
                // Response.Cookies.Append("Username", user.UserName, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.None, Secure=true });
                //Response.Cookies.Append("X-Refresh-Token", user.RefreshToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.None, Secure=true });
            }else {
                Random generator = new Random();
                twoFactorPin = generator.Next(0,1000000).ToString("D6");
                var result = await  _twoFactorService.SendTwoFactorCode(user.PhoneNumber.ToString(),twoFactorPin);
                if(result == "Success")
                {
                    userToPassTwoFactor = userLogged;
                    return StatusCode(409);
                }      
            }
            return Ok();
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
                    UserRole=UserRole.Prospect,
                    UsedPlatform = externalLoginDto.UsedPlatform };

                var result = await _userManager.CreateAsync(newUser);
                if(result.Succeeded){
                    result = await _userManager.AddToRoleAsync(newUser, newUser.UserRole);
                    if(result.Succeeded){
                        var userLogged = new UserLoginDto
                        { 
                            Username = newUser.UserName,
                            Token = await _tokenService.GenerateToken(newUser)
                        };
                            var identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme);
                            result = await _userManager.AddClaimAsync(newUser, new Claim(userLogged.Username,userLogged.Token));
                            if(result.Succeeded)
                            {
                                Response.Cookies.Append("X-Authorization-token", userLogged.Token, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.None, Secure=true });
                                // Response.Cookies.Append("Username", newUser.UserName, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.None, Secure=true });
                                // _context.SaveChanges();
                                return userLogged;
                            }
                        
                    }
                }
            _notificationService.Add(new Notification{
             NotificationType = NotificationsType.NewUser,
             Message ="Un nou user s-a inregistrat"
            });
            }
            var existentUser = new UserLoginDto{ Username = user.UserName, Token = await _tokenService.GenerateToken(user)};
            if(!user.TwoFactorEnabled)
            {
                //var signInStatus = await SignInManager.PasswordSignInAsync(user, loginDto.Password, true, lockoutOnFailure: false);
                Response.Cookies.Append("X-Authorization-token", existentUser.Token, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.None, Secure=true });
                // Response.Cookies.Append("Username", user.UserName, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.None, Secure=true });
                //Response.Cookies.Append("X-Refresh-Token", user.RefreshToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.None, Secure=true });
            }else {
                Random generator = new Random();
                twoFactorPin = generator.Next(0,1000000).ToString("D6");
                var result = await  _twoFactorService.SendTwoFactorCode(user.PhoneNumber.ToString(),twoFactorPin);
                if(result == "Success")
                {
                    userToPassTwoFactor = existentUser;
                    return StatusCode(409);
                }      
            }
            // Response.Cookies.Append("X-Authorization-token", existentUser.Token, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.None, Secure=true });
            // Response.Cookies.Append("Username", user.UserName, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.None, Secure=true });
            return existentUser;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult> Register([FromForm]RegisterDto registerDto)
        {
            registerDto.UserRole =UserRole.Prospect;
            var user = new User 
                { 
                UserName = registerDto.Username, 
                Email = registerDto.Email, 
                FirstName=registerDto.FirstName, 
                LastName=registerDto.LastName, 
                UserRole=UserRole.Prospect,
                UsedPlatform = "vidivici"
                
                };

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
            _notificationService.Add(new Notification{
             NotificationType = NotificationsType.NewUser,
             Message ="Un nou user s-a inregistrat"
            });
            return StatusCode(201);
        }

        [Authorize(Roles = "Admin,Poweruser")]    
        [HttpPost("registerRole")]
        public async Task<ActionResult> RegisterWithRole([FromForm]RegisterDto registerDto)
        {
            var userrole = char.ToUpper(registerDto.UserRole.ToLower()[0]) + registerDto.UserRole.Substring(1);
            var user = new User { 
                UserName = registerDto.Username,
                 Email = registerDto.Email, 
                 FirstName = registerDto.FirstName,
                 LastName = registerDto.LastName,
                 UserRole = userrole,
                 UsedPlatform = "vidivici" };

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
                Id = user.Id,
                Username = user.UserName,
                UserRole = user.UserRole,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                TwoFactorEnabled = user.TwoFactorEnabled
            };
        }

        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            
            Response.Cookies.Delete("X-Authorization-token", new CookieOptions 
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true
            });
             
            return  Ok("");
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
           
            return Ok();
        }


        [AllowAnonymous]
        [HttpPost("twoFactor")]
        public async Task<ActionResult> VerifyTwoFactor([FromForm]string smsPin)
        {
            var user = await _userManager.FindByNameAsync(userToPassTwoFactor.Username);
            
            if(smsPin == twoFactorPin)
            {
                if(!user.TwoFactorEnabled )
                {
                    user.TwoFactorEnabled = true;
                    await _userManager.UpdateAsync(user);
                }
                if(Request.Cookies["X-Authorization-token"]==null){
                Response.Cookies.Append("X-Authorization-token", userToPassTwoFactor.Token, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.None, Secure=true });}
                return Ok();
            }
            return Unauthorized();
        }

        [Authorize(Roles = "Admin,Investor,Prospect,Employee,Pending,Poweruser")]
        [HttpPost("enableTwoFactor")]
        public async Task<ActionResult> EnableTwoFactor([FromForm]string phoneNumber)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            user.PhoneNumber = phoneNumber;
            await _userManager.UpdateAsync(user);
            Random generator = new Random();
            twoFactorPin = generator.Next(0,1000000).ToString("D6");
            var result = await  _twoFactorService.SendTwoFactorCode(user.PhoneNumber.ToString(),twoFactorPin);
            if(result == "Success")
            {
                userToPassTwoFactor = new UserLoginDto{Username = user.UserName};
                return Ok();
            } 
            return NotFound();     
        }
    }
}