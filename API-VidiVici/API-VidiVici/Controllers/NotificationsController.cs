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
    public class NotificationsController : Controller
    {
        private readonly ILogger<NotificationsController> _logger;
        private readonly NotificationService _notificationService;
        public NotificationsController(ILogger<NotificationsController> logger,NotificationService notificationService)
        {
            _logger = logger;
            _notificationService = notificationService;
        }

        
        [Authorize(Roles = "Poweruser,Admin,Employee")]
        [HttpGet("getAll")]
        public async Task<IEnumerable<Notification>> GetAll()
        {
            return await _notificationService.GetAll();
        }

        
    }
}