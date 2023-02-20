

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
    public class PartnersController : Controller
    {
        private readonly ILogger<PartnersController> _logger;
        private readonly PartnersService _service;
        public PartnersController(ILogger<PartnersController> logger,PartnersService service)
        {
            _logger = logger;
            _service = service;
        }

        [Authorize(Roles ="Admin,Poweruser,Employee,Investor")]
        [HttpGet("getAll")]
        public async Task<IEnumerable<Partner>> GetAll()
        {
            return await _service.GetAll();
        }


        [Authorize(Roles ="Admin,Poweruser,Employee")]
        [HttpPost("addPartner")]
        public async void AddPartner([FromForm] PartnerDto partnerDto)
        {
            if(partnerDto!=null)
            {
                Partner partner = new Partner
                {
                    Name = partnerDto.Name, 
                    Description = partnerDto.Description,
                    LogoTitle = partnerDto.LogoTitle
                };

                byte[] imageData = null;
                using(var binaryReader = new BinaryReader(partnerDto.Logo.OpenReadStream()))
                {
                    imageData = binaryReader.ReadBytes((int)partnerDto.Logo.Length);
                }
                partner.Logo=imageData;
                _service.Add(partner);
            }
        }

       
    }
}