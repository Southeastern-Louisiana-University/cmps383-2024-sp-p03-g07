using Microsoft.AspNetCore.Identity;

namespace Selu383.SP24.Api.Features.Authorization;

public class Role : IdentityRole<int>
{
    public virtual ICollection<UserRole> Users { get; set; } = new List<UserRole>();
}