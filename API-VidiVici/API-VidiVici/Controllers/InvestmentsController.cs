using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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

        [HttpGet]
        public async  Task<Investment> Get(int id)
        {
            return await _services.Get(id);
        }
    }
}