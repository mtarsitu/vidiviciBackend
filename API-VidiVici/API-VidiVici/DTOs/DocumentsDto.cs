using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.DTOs
{
    public class DocumentsDto
    {
        

        public string? ClientId {get;set;}
        public string? Title { get; set; }
        public IFormFile? Image { get; set; }
    }
}