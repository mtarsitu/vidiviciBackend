using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using API_VidiVici.Services;
using API_VidiVici.Model;

namespace API_VidiVici.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PrincipalInvestmentsController : Controller
    {
        private readonly ILogger<PrincipalInvestmentsController> _logger;
        private readonly PrincipalInvestmentServices _services;

        public PrincipalInvestmentsController(ILogger<PrincipalInvestmentsController> logger, PrincipalInvestmentServices services)
        {
            _logger = logger;
            _services = services;
        }

        [HttpGet]
        public async Task<PrincipalInvestment> Get(int id)
        {
            return await _services.Get(id);
        }
    }
}