using Deftility.Areas.Admin.DTOs.Category;
using Deftility.Services.Contracts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Deftility.Areas.Admin.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/admin/[controller]/[action]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoriesService categoriesService;

        public CategoryController(ICategoriesService categoriesService)
        {
            this.categoriesService = categoriesService;
        }

        [HttpPost]
        public async Task<ActionResult<object>> Create(CreateCategoryDTO categoryDto)
        {
            if (!this.User.IsInRole("Admin"))
            {
                return Unauthorized();
            }

            try
            {
                await this.categoriesService.AddAsync(categoryDto.Name);

                return Ok(new { message = "Category created successfully." });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "Something went wrong." });
            }
        }

        [HttpDelete]
        public async Task<ActionResult<object>> Remove(RemoveCategoryDTO categoryDto)
        {
            if (!this.User.IsInRole("Admin"))
            {
                return Unauthorized();
            }

            try
            {
                var category = this.categoriesService.Find(categoryDto.Id);

                if (category == null)
                {
                    return NotFound(new { error = $"Category with ID: '{categoryDto.Id}' does not exist." });
                }

                await this.categoriesService.RemoveAsync(category);

                return Ok(new { message = "Category removed successfully." });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "Something went wrong." });
            }
        }
    }
}
