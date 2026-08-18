using Microsoft.AspNetCore.Mvc;
using StudentManagement.Application.Interfaces.Services;
using StudentManagement.Application.DTOs.Auth;

namespace StudentManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AuthRequest request)
        {
            var token = await _authService.Register(request.Username, request.Password);

            if (token == null)
                return BadRequest("Username already exists");

            return Ok(new { token });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthRequest request)
        {
            var token = await _authService.Login(request.Username, request.Password);

            if (token == null)
                return Unauthorized("Invalid credentials");

            return Ok(new { token });
        }
    }

    
}