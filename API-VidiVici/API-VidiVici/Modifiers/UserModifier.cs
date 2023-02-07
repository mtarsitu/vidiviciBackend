using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.DTOs;
using API_VidiVici.Model;

namespace API_VidiVici.Modifiers
{
    public static class UserModifier
    {
        public static UserDto ToUserDto(User user)
        {
            return new UserDto {
                Id = user.Id,
                Username = user.UserName,
                UserRole = user.UserRole,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                UsedPlatform = user.UsedPlatform,
                AprovedBy = user.AprovedById,

            };    
        }
    }
}