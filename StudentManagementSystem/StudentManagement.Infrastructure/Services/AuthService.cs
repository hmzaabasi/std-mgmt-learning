using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StudentManagement.Application.Interfaces.Services;
using StudentManagement.Domain.Entities;
using StudentManagement.Infrastructure.Persistence;

namespace StudentManagement.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly SqlServerDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(SqlServerDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<string?> Register(string username, string password, string role)
        {
            if (await _context.Users.AnyAsync(u => u.Username == username))
                return null;

            var user = new User
            {
                Username = username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
                Role = role
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return GenerateToken(user);
        }

        public async Task<string?> Login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
                return null;

            return GenerateToken(user);
        }

        private string GenerateToken(User user)
        {
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.Username),
            new Claim(ClaimTypes.Role, user.Role)
        };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(
                    double.Parse(_configuration["Jwt:ExpiryMinutes"]!)),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}