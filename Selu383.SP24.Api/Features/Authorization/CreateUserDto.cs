using System.ComponentModel.DataAnnotations;

namespace Selu383.SP24.Api.Features.Authorization;

public class CreateUserDto
{
    [Required]
    public string UserName { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;

    [Required, MinLength(1)]
    public string[] Roles { get; set; } = Array.Empty<string>();
}