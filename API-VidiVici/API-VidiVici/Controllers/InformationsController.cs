using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using API_VidiVici.data;
using API_VidiVici.Services;
using API_VidiVici.DTOs;

namespace API_VidiVici.Controllers
{
    [Route("[controller]")]
    public class InformationsController : Controller
    {
        private readonly ILogger<InformationsController> _logger;
        private readonly VidiviciDbContext _context;
        private readonly InformationsServices _services;
        public InformationsController(ILogger<InformationsController> logger, VidiviciDbContext context, InformationsServices services)
        {
            _logger = logger;
            _context = context;
            _services = services;
        }

        [Authorize(Roles = "Admin,Investor,Prospect,Employee,Pending,Poweruser")]
        [HttpGet("userInformations")]
        public async Task<IEnumerable<InformationDto>> GetUserInformation(string id){
            return await _services.GetByUserId(id);
        }
    }
}