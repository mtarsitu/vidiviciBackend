using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.DTOs
{
    public class DocumentsDto
    {
        

        public string? ClientId {get;set;}
        public string? IdTitle { get; set; }
        public string? BankStatementTitle { get; set; }
        public IFormFile? BankStatementImage{ get; set; }
        public IFormFile? IdImage { get; set; }
    }
}