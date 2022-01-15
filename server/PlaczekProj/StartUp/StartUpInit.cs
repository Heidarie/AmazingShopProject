using Microsoft.AspNetCore.Identity;
using PlaczekProj.Models.DatabaseModels;

namespace PlaczekProj.StartUp
{
    public static class StartUpInit
    {
        public static async Task StartUp(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            string password = "Haslo123@";
            var user = new User()
            {
                Name = "Admin",
                Email = "dawidogly@gmail.com",
                Surname = "Admin",
                PhoneNumber = "000",
                UserName = "dawidogly@gmail.com"
            };

            var ifExists = await userManager.FindByEmailAsync(user.Email);
            if (ifExists == null)
            {
                var createUser = await userManager.CreateAsync(user, password);
                if (createUser.Succeeded)
                {
                    var role = await roleManager.RoleExistsAsync("admin");
                    if (!role)
                    {
                        await roleManager.CreateAsync(new IdentityRole("admin"));
                    }
                    await userManager.AddToRoleAsync(user, "admin");
                }
            }
        }
    }
}
