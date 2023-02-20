using API_VidiVici.data;
using API_VidiVici.DTOs;
using API_VidiVici.Model;
using API_VidiVici.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API_VidiVici.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PartnerDetailsController : Controller
    {
        private readonly ILogger<PartnerDetailsController> _logger;
        private readonly PartnersDetailsService _service;
        public PartnerDetailsController(ILogger<PartnerDetailsController> logger,PartnersDetailsService service)
        {
            _logger = logger;
            _service = service;
        }

        [Authorize(Roles ="Admin,Poweruser,Employee")]
        [HttpPost("addPartner")]
        public async void AddPartner([FromForm] PartnersDetails partnerDetails)
        {
            _service.Add(partnerDetails);
        }

        [Authorize(Roles ="Admin,Poweruser,Employee,Investor")]
        [HttpGet("getAll")]
        public async Task<IEnumerable<PartnersDetails>> GetAll()
        {
            return await _service.GetAll();
        }
    }
}