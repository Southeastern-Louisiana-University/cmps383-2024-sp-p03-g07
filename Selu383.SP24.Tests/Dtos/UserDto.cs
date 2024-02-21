namespace Selu383.SP24.Tests.Dtos;

internal class UserDto : PasswordGuard
{
    public int Id { get; set; }
    public string? UserName { get; set; }
    public string[]? Roles { get; set; }
}