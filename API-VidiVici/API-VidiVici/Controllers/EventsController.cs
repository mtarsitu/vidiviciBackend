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
    [ApiController]
    [Route("[controller]")]
    public class EventsController : Controller
    {
        private readonly ILogger<EventsController> _logger;
        private readonly EventService _service;

        public EventsController(ILogger<EventsController> logger, EventService service)
        {
            _logger = logger;
            _service = service;
        }

        [Authorize(Roles = "Poweruser,Admin,Employee")]
        [HttpPost("add")]
        public void Add(Event newEvent)
        {
            _service.Add(newEvent);
        }

        [Authorize(Roles = "Poweruser,Admin,Employee")]
        [HttpGet("getAll")]
        public async Task<IEnumerable<Event>> GetAll()
        {
            return await _service.GetAll();
        }
        
    }
}