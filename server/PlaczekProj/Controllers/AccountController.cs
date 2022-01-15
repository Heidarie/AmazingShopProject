using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PlaczekProj.Models;
using PlaczekProj.Models.DatabaseModels;
using System.Security.Claims;

namespace PlaczekProj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : BaseController
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegistrationModel model)
        {
            var user = new User()
            {
                Name = model.Name,
                Email = model.Email,
                Surname = model.Surname,
                PhoneNumber = model.PhoneNumber,
                UserName = model.Email
            };
            try
            {
                var ifExists = await userManager.FindByEmailAsync(user.Email);
                if(ifExists == null)
                {
                    var createUser = await userManager.CreateAsync(user, model.Password);
                    if (createUser.Succeeded)
                    {
                        if(await roleManager.RoleExistsAsync("client") == false)
                        {
                            await roleManager.CreateAsync(new IdentityRole("client"));
                        }
                        await userManager.AddToRoleAsync(user, "client");

                        DatabaseManager.AttachUserToBasket(user.Id, Guid.NewGuid());

                        await signInManager.SignInAsync(user, isPersistent: false);
                        return Ok();
                    }
                    return Conflict(createUser.Errors);
                }
                return BadRequest();
            }
            catch(Exception ex)
            {
                Logger.Error("Error on creating user", ex);
                return BadRequest();
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var user = await userManager.FindByNameAsync(model.Email);
            if(user != null)
            {
                var checkPassword = await userManager.CheckPasswordAsync(user, model.Password);
                if (checkPassword)
                {
                    if (!DatabaseManager.DoesBasketExist(user.Id))
                    {
                        DatabaseManager.AttachUserToBasket(user.Id, Guid.NewGuid());
                    }
                    var claims = new List<Claim>();

                    claims.Add(new Claim(ClaimTypes.Name, user.UserName));
                    var role = await userManager.GetRolesAsync(user);
                    claims.Add(new Claim(ClaimTypes.Role, role.FirstOrDefault()));
                    
                    var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                    var principal = new ClaimsPrincipal(identity);
                    var props = new AuthenticationProperties();
                    props.IsPersistent = model.RememberMe;

                    HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, props).Wait();   

                    await signInManager.SignInAsync(user, false);
                    return Ok();
                }
                return BadRequest();
            }
            return NotFound();
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> IsUserLogged()
        {
            if (HttpContext.User.Identity.Name != null)
            {
                User user = await userManager.FindByNameAsync(HttpContext.User.Identity.Name);
                if (user != null)
                {
                    if (await userManager.IsInRoleAsync(user, "client"))
                    {
                        var role = await roleManager.FindByNameAsync("client");
                        return Ok(role);
                    }
                    else if (await userManager.IsInRoleAsync(user, "admin"))
                    {
                        var role = await roleManager.FindByNameAsync("admin");
                        return Ok(role);
                    }
                }
            }
            return NotFound();
        }

        [HttpPost]
        [Authorize]
        [Route("[action]")]
        public async Task<IActionResult> ChangeUserPassword(string oldPassword, string newPassword)
        {
            User user = await userManager.FindByNameAsync(HttpContext.User.Identity.Name);
            var result = await userManager.ChangePasswordAsync(user, oldPassword, newPassword);
            if (result.Succeeded)
            {
                return Ok();
            }
            return Problem();
        }

        [Authorize]
        [Route("LogOff")]
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }
    }
}
