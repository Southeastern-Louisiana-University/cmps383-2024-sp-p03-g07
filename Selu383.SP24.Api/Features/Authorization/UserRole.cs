using Microsoft.AspNetCore.Identity;

namespace Selu383.SP24.Api.Features.Authorization;

public class UserRole : IdentityUserRole<int>
{
    public virtual Role? Role { get; set; }
    public virtual User? User { get; set; }
}
