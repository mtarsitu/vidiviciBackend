using API_VidiVici.Model;
using API_VidiVici.DTOs;
using Microsoft.AspNetCore.Mvc;
using API_VidiVici.Services;
using Microsoft.AspNetCore.Authorization;
namespace API_VidiVici.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InvestmentsController : Controller
    {
        private readonly ILogger<InvestmentsController> _logger;
        private readonly InvestmentsServices _services;
        public InvestmentsController(ILogger<InvestmentsController> logger, InvestmentsServices services)
        {
            _logger = logger;
            _services = services;
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

        [Authorize(Roles ="Admin,Poweruser,Employee")]
        [HttpPost("newInvestment")]
        public void Add(InvestmentDto investment){
            _services.Add(investment);
        }

        [Authorize(Roles ="Admin,Poweruser,Employee")]
        [HttpPost("editInvestment")]
        public void Edit(InvestmentDto investment){
            _services.Edit(investment);
        }


        [Authorize(Roles ="Admin,Poweruser,Employee,Prospect,Investor,Pending")]
        [HttpGet("totalInvestments")]

        public Task<double> TotalSum()
        {
            return _services.GetTotalSum();
        }
        
        
    }
}