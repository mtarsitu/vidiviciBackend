using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.data;
using API_VidiVici.DTOs;
using API_VidiVici.Model;
using API_VidiVici.Modifiers;
using API_VidiVici.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API_VidiVici.Controllers
{
    [Route("[controller]")]
    public class AdminsController : Controller
    {
        private readonly ILogger<AdminsController> _logger;
        private readonly UserManager<User> _userManager;
        private readonly InvestmentsServices _investmentsService;
        private readonly InformationsServices _informationsService;
        private readonly VidiviciDbContext _context;
        public AdminsController(
            ILogger<AdminsController> logger, 
            UserManager<User> userManager,
            InvestmentsServices investmentsServices,
            InformationsServices informationsServices,
            VidiviciDbContext context
            )
        {
            _logger = logger;
            _userManager = userManager;  
            _investmentsService = investmentsServices;
            _informationsService = informationsServices;
            _context = context;
        }

        [Authorize(Roles = "Admin,Investor,Employee,Investor")]
        [HttpGet("UserAndInvestments")]
        public async Task<ActionResult<InvestorDto>> GetUserAndInvestments(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            var actualUser = InvestorModifier.GetInvestorDto(user);
            var Investments = await _investmentsService.GetUserInvestment(user.Id);
            var informations = await _informationsService.GetByUserId(user.Id);
            actualUser.Investments = new List<InvestmentDto>();
            
            foreach(Investment investment in Investments){
                actualUser.Investments.Add(InvestmentModifier.ToInvestmentDto(investment));
            }

            foreach(InformationDto? informationDto in informations){
                actualUser?.Informations?.Add(informationDto);
            }
            return actualUser;
        }

        [Authorize(Roles = "Poweruser,Admin,Employee")]
        [HttpGet("AllUser")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
        {
            List<UserDto> userDtoList = new List<UserDto>();
            var users = await _userManager.Users.ToListAsync();
            
            foreach(User user in users){
               
                userDtoList.Add(UserModifier.ToUserDto(user));

            }
            return userDtoList;
        }

        [Authorize(Roles = "Poweruser,Admin,Employee")]
        [HttpGet("acceptPending")]
        public async Task<ActionResult> AcceptPending(string id)
        {
            var user = await _userManager.FindByIdAsync(id);  
            if(user!= null)
            {
            await _userManager.RemoveFromRoleAsync(user, "Pending");
            
            await _userManager.AddToRoleAsync(user, UserRole.Investor);
            await _userManager.UpdateAsync(user);
            user.UserRole = UserRole.Investor;
            _context.SaveChanges();

            return Ok();
            }
            return NotFound();
        }
        
    }
}