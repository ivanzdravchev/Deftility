using System.ComponentModel.DataAnnotations;

namespace Deftility.DTOs.User
{
    public class LoginUserDTO
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
