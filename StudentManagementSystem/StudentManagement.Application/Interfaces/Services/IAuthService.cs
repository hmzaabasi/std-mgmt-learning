using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagement.Application.Interfaces.Services
{
    public interface IAuthService
    {
        Task<string?> Register(string username, string password, string role);
        Task<string?> Login(string username, string password);
    }
}
