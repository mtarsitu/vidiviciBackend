
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
    public class ApplicationsController : Controller
    {
        private readonly ILogger<ApplicationsController> _logger;
        private readonly ApplicationService _service;
        private readonly UserManager<User> _userManager;
        private readonly VidiviciDbContext _context;
        private readonly NotificationService _notificationService;
        public ApplicationsController(
            ILogger<ApplicationsController> logger,
            ApplicationService service,
            UserManager<User> userManager,
            VidiviciDbContext context,
            NotificationService notificationService
        )
        {
            _logger = logger;
            _service = service;
            _userManager = userManager;
            _context = context;
            _notificationService = notificationService;
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
                _notificationService.Add(new Notification{
                    NotificationType = NotificationsType.Pending,
                    Message = $"{user.FirstName} a completat toate documentele, necesita verificare"
                });
                return Ok();   
            }
            return NotFound();
        }

        [Authorize(Roles ="Admin,Poweruser,Employee,Prospect")]
        [HttpPost("addDocuments")]
        public async Task<ActionResult> AddDocuments([FromForm]DocumentsDto documentsDto)
        {
            var user = await _userManager.FindByIdAsync(documentsDto.ClientId);
            if(documentsDto !=null){
                
                Documents documents = new Documents {IdTitle = documentsDto.IdTitle,BankStatementTitle = documentsDto.BankStatementTitle, ClientId=documentsDto.ClientId};
                byte[] idDataImage = null;
                byte[] bankStatementDataImage = null;
                using (var binaryReader = new BinaryReader(documentsDto.IdImage.OpenReadStream()))
                {
                    idDataImage = binaryReader.ReadBytes((int)documentsDto.IdImage.Length);
                }
                 using (var binaryReader = new BinaryReader(documentsDto.BankStatementImage.OpenReadStream()))
                {
                    bankStatementDataImage = binaryReader.ReadBytes((int)documentsDto.BankStatementImage.Length);
                }
                documents.IdImage = idDataImage;
                documents.BankStatementImage = bankStatementDataImage;
                _service.AddDocuments(documents);
                
            }
            if(user!= null){
                user.UploadedDocuments = true;
                await _userManager.UpdateAsync(user);
                _notificationService.Add(new Notification{
                    NotificationType = NotificationsType.Pending,
                    Message = $"{user.FirstName} a introdus toate documentele!"
                });
                return Ok();
            }
           
            return NotFound();
        }



    }
}