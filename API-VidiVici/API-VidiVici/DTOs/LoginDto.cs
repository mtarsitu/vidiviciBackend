using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.Model;
namespace API_VidiVici.DTOs
{
    public class LoginDto
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
    }
}