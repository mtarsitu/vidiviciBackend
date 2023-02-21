using API_VidiVici.Model;
using API_VidiVici.DTOs;
using Microsoft.AspNetCore.Mvc;
using API_VidiVici.Services;
using Microsoft.AspNetCore.Authorization;
using API_VidiVici.Modifiers;
using Microsoft.AspNetCore.Identity;

namespace API_VidiVici.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InvestmentsController : Controller
    {
        private readonly ILogger<InvestmentsController> _logger;
        private readonly InvestmentsServices _services;
        private readonly UserManager<User> _userManager;
        private readonly InformationsServices _informationsServices;
         private readonly NotificationService _notificationService;
        public InvestmentsController(
            ILogger<InvestmentsController> logger,
            InvestmentsServices services,
            UserManager<User> userManager,
            InformationsServices informationsServices,
            NotificationService notificationService
            )
        {
            _logger = logger;
            _services = services;
            _userManager = userManager;
            _informationsServices = informationsServices;
            _notificationService = notificationService;
        }

        [Authorize(Roles ="Admin,Poweruser,Employee")]
        [HttpGet("getInvestment")]
        public async  Task<Investment> Get(int id)
        {
            return await _services.Get(id);
        }

        [Authorize(Roles ="Admin,Poweruser,Employee")]
        [HttpGet("getAllInvestment")]
        public async  Task<IEnumerable<InvestmentDto>> GetAll()
        {
            return await _services.GetAll();
        }

        [Authorize(Roles ="Admin,Poweruser,Employee,Investor")]
        [HttpPost("add")]
        public void Add([FromForm]NewInvestmentDto investment){
            
            _services.Add(investment);
            _notificationService.Add(new Notification{
                    NotificationType = NotificationsType.Investment,
                    Message = "O noua cerere de investitie a fost adaugata, Necesita aprobare"
            });
        }

        [Authorize(Roles ="Admin,Poweruser,Employee")]
        [HttpPost("editInvestment")]
        public void Edit(InvestmentDto investment){
            _services.Edit(InvestmentModifier.ToInvestment(investment));
        }


        [Authorize(Roles ="Admin,Poweruser,Employee,Prospect,Investor,Pending")]
        [HttpGet("totalInvestments")]

        public Task<double> TotalSum()
        {
            return _services.GetTotalSum();
        }
        
        [Authorize(Roles = "Admin,Investor,Employee,Investor")]
        [HttpGet("UserAndInvestments")]
        public async Task<ActionResult<InvestorDto>> GetUserAndInvestments(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            var actualUser = InvestorModifier.GetInvestorDto(user);
            var Investments = await _services.GetUserInvestment(user.Id);
            var informations = await _informationsServices.GetByUserId(user.Id);
            actualUser.Investments = new List<InvestmentDto>();
            
            foreach(Investment investment in Investments){
                actualUser.Investments.Add(InvestmentModifier.ToInvestmentDto(investment));
            }

            foreach(InformationDto? informationDto in informations){
                actualUser?.Informations?.Add(informationDto);
            }
            return actualUser;
        }

        [Authorize(Roles = "Admin,Employee,Poweruser")]
        [HttpGet("pendingInvestments")]
        public async Task<IEnumerable<InvestmentDto>> GetPendings()
        {
            return await _services.GetPending();
        }

        [Authorize(Roles = "Admin,Employee,Poweruser")]
        [HttpPost("aproveInvestment")]
        public async Task<IActionResult> ApproveInvestment(int id)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var investment = await _services.Get(id);
            investment.Pending = false;
            investment.DateAproved = DateTime.UtcNow;
            investment.AprovedById = user.Id;
            _services.Edit(investment);

            return Ok();
        }


    }
}