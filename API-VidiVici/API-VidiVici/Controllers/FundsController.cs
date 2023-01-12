using Microsoft.AspNetCore.Mvc;
using API_VidiVici.Services;
using API_VidiVici.Model;
using Microsoft.AspNetCore.Authorization;

namespace API_VidiVici.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FundsController : Controller
    {
        private readonly ILogger<FundsController> _logger;
        private readonly FundsServices _services;

        public FundsController(ILogger<FundsController> logger, FundsServices services)
        {
            _logger = logger;
            _services = services;
        }

        [Authorize(Roles ="Admin,Poweruser,Employee")]
        [HttpGet("getFund")]
        public async Task<Fund> Get(int id)
        {
            return await _services.Get(id);
        }
        
        [Authorize(Roles ="Admin,Poweruser,Employee")]
        [HttpGet("getAll")]
        public async Task<IEnumerable<Fund>> GetAll(){
            return await _services.GetAll();
        }
        [Authorize(Roles ="Admin,Poweruser,Employee,Investor,Prospect,Pending")]
        [HttpGet("getAllPublic")]
        public async Task<IEnumerable<Fund>> GetAllPublic(){
            return await _services.GetAllPublic();
        }
        [Authorize(Roles ="Admin,Poweruser,Employee")]
        [HttpPost("editFund")]
        public void Edit(Fund fund){
            _services.Edit(fund);
        }
        [Authorize(Roles ="Admin,Poweruser,Employee")]
        [HttpPost("removeFund")]
        public void Remove(int id){
            _services.Remove(id);
        }

    }
}