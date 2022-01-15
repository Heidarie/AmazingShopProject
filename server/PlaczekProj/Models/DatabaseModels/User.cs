using Microsoft.AspNetCore.Identity;

namespace PlaczekProj.Models.DatabaseModels
{
    public partial class User : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }

    }
}
