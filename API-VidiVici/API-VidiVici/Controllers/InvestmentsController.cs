using API_VidiVici.Model;
using API_VidiVici.DTOs;
using Microsoft.AspNetCore.Mvc;
using API_VidiVici.Services;

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

        [HttpGet("getInvestment")]
        public async  Task<Investment> Get(int id)
        {
            return await _services.Get(id);
        }

        [HttpPost("newInvestment")]
        public void Add(InvestmentDto investment){
            _services.Add(investment);
        }

        
    }
}