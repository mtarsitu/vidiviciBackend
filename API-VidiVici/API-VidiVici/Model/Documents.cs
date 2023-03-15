using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.Model
{
    public class Documents:BaseEntity
    {
       

        public string? ClientId {get;set;}
        public string? IdTitle { get; set; }
        public byte[]? IdImage { get; set; }
        public string? BankStatementTitle {get;set;}
        public byte[]? BankStatementImage {get;set;}
        public User? Client { get; set; }
    }
}