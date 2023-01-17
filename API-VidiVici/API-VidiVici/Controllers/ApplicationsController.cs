using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.Model;
using API_VidiVici.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API_VidiVici.Controllers
{
    [Route("[controller]")]
    public class ApplicationsController : Controller
    {
        private readonly ILogger<ApplicationsController> _logger;
        private readonly ApplicationService _service;
        public ApplicationsController(ILogger<ApplicationsController> logger,
            ApplicationService service
        )
        {
            _logger = logger;
            _service = service;
        }

        [Authorize(Roles ="Admin,Poweruser,Employee")]
        [HttpGet("/get")]
        public async Task<Application> Get(string clientId)
        {
            return await _service.Get(clientId);
        }

        [Authorize(Roles ="Admin,Poweruser,Employee")]
        [HttpGet("/post")]
        public void Add(Application application)
        {
             _service.Add(application);
        }

       
    }
}