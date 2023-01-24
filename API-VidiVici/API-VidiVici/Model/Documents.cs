using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.Model
{
    public class Documents
    {
        public int Id {get;set;}

        public string? ClientId {get;set;}
        public string? IdentityCardTitle { get; set; }
        public byte[]? IdentityCardData { get; set; }
        public User? Client { get; set; }
    }
}