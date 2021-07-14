using System.ComponentModel.DataAnnotations;

namespace Deftility.DTOs.User
{
    public class RegisterUserDTO
    {
        private const string UsernameRegex = "^[A-Za-z0-9-_]+$";
        private const string UsernameRegexError = "Username can contain only letters, numbers, dashes and underscores.";
        private const string UsernameTooShortError = "Username must be at least 3 characters long.";
        private const string EmailErrorMessage = "Invalid email format.";
        private const string PasswordTooShortError = "Password must be at least 4 characters long.";

        [Required]
        [RegularExpression(UsernameRegex, ErrorMessage = UsernameRegexError)]
        [MinLength(3, ErrorMessage = UsernameTooShortError)]
        public string Username { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = EmailErrorMessage)]
        public string Email { get; set; }

        [Required]
        [MinLength(4, ErrorMessage = PasswordTooShortError)]
        public string Password { get; set; }
    }
}
