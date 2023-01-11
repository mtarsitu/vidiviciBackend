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
    public class FundsController : Controller
    {
        private readonly ILogger<FundsController> _logger;
        private readonly FundsServices _services;

        public FundsController(ILogger<FundsController> logger, FundsServices services)
        {
            _logger = logger;
            _services = services;
        }

        [HttpGet]
        public async Task<Fund> Get(int id)
        {
            return await _services.Get(id);
        }
    }
}