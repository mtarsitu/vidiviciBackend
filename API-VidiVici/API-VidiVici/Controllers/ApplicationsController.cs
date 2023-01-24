using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.data;
using API_VidiVici.DTOs;
using API_VidiVici.Model;
using API_VidiVici.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API_VidiVici.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApplicationsController : Controller
    {
        private readonly ILogger<ApplicationsController> _logger;
        private readonly ApplicationService _service;
        private readonly UserManager<User> _userManager;
        private readonly VidiviciDbContext _context;
        public ApplicationsController(
            ILogger<ApplicationsController> logger,
            ApplicationService service,
            UserManager<User> userManager,
            VidiviciDbContext context
        )
        {
            _logger = logger;
            _service = service;
            _userManager = userManager;
            _context = context;
        }

        [Authorize(Roles ="Admin,Poweruser,Employee")]
        [HttpGet("get")]
        public async Task<Application> Get(string clientId)
        {
            return await _service.Get(clientId);
        }

        [Authorize(Roles ="Admin,Poweruser,Employee")]
        [HttpGet("getDocuments")]
        public async Task<Documents> GetDocuments(string clientId){
            return await _service.GetDocuments(clientId);
        }

        [Authorize(Roles ="Admin,Poweruser,Employee,Prospect")]
        [HttpPost("add")]
        public  async Task<ActionResult>  Add(Application application)
        {
            if(application!=null){

            _service.Add(application);
            _context.SaveChanges();
            }
            var user = await _userManager.FindByIdAsync(application.ClientId);
            if (user!= null)
            {
                await _userManager.RemoveFromRoleAsync(user, UserRole.Prospect);
                
                await _userManager.AddToRoleAsync(user, UserRole.Pending);
                await _userManager.UpdateAsync(user);
                user.UserRole = UserRole.Pending;
                _context.SaveChanges();
                return Ok();   
            }
            return Ok();
        }

        [Authorize(Roles ="Admin,Poweruser,Employee,Prospect")]
        [HttpPost("addDocuments")]
        public async void AddDocuments([FromForm]DocumentsDto documentsDto)
        {
            if(documentsDto !=null){
                
                Documents documents = new Documents {IdentityCardTitle = documentsDto.Title, ClientId=documentsDto.ClientId};
                byte[] imageData = null;
                using (var binaryReader = new BinaryReader(documentsDto.Image.OpenReadStream()))
                {
                    imageData = binaryReader.ReadBytes((int)documentsDto.Image.Length);
                }
                documents.IdentityCardData = imageData;
                _service.AddDocuments(documents);
                
            }
            // return Ok();
        }



    }
}