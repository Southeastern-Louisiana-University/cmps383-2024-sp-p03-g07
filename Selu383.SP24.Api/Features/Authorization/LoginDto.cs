using System.ComponentModel.DataAnnotations;

namespace Selu383.SP24.Api.Features.Authorization;

public class LoginDto
{
    [Required]
    public string UserName { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}