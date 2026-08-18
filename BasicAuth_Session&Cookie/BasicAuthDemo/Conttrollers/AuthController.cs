using BasicAuthDemo.Models;
using Microsoft.AspNetCore.Mvc;

namespace BasicAuthDemo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private static List<User> _users = new();
        private static int _nextId = 1;

        [HttpPost("register")]
        public IActionResult Register([FromBody] User request)
        {
            if (_users.Any(u => u.Username == request.Username))
                return BadRequest("Username already exists");

            var user = new User
            {
                Id = _nextId++,
                Username = request.Username,
                Password = request.Password
            };

            _users.Add(user);
            return Ok("Registered successfully");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User request)
        {
            var user = _users.FirstOrDefault(u =>
                u.Username == request.Username &&
                u.Password == request.Password);

            if (user == null)
                return Unauthorized("Invalid credentials");

            HttpContext.Session.SetString("UserId", user.Id.ToString());
            HttpContext.Session.SetString("Username", user.Username);

            return Ok("Logged in successfully");
        }

        [HttpGet("dashboard")]
        public IActionResult Dashboard()
        {
            var username = HttpContext.Session.GetString("Username");

            if (username == null)
                return Unauthorized("Not logged in");

            return Ok($"Welcome {username}!");
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return Ok("Logged out successfully");
        }
    }
}