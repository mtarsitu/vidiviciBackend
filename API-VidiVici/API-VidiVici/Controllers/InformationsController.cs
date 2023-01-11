using Microsoft.AspNetCore.Mvc;

using API_VidiVici.data;

namespace API_VidiVici.Controllers
{
    [Route("[controller]")]
    public class InformationsController : Controller
    {
        private readonly ILogger<InformationsController> _logger;
        private readonly VidiviciDbContext _context;
        public InformationsController(ILogger<InformationsController> logger, VidiviciDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        
    }
}