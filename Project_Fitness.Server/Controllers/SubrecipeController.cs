using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_Fitness.Server.DTO;
using Project_Fitness.Server.Models;

namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubrecipeController : ControllerBase
    {
        private readonly MyDbContext _db;
        public SubrecipeController(MyDbContext db) 
        {
            _db = db;
        }
        [HttpGet("Recipe/GetAllSubrecipe")]
        public ActionResult GetAllSubrecipe() 
        {
            var subrecipe = _db.SubRecipes.ToList();
            if (subrecipe == null)
            {
                return NoContent();
            }
            return Ok(subrecipe);
        }
        [HttpGet("Recipe/GetSubrecipeById/{id}")]
        public IActionResult GetSubrecipeById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid Subrecipe");
            }
            var recipe = _db.SubRecipes.Where(p => p.SubRecipeId == id).FirstOrDefault();
            if (recipe == null)
            {
                return NotFound("No subrecipe found");
            }
            return Ok(recipe);
        }

        [HttpGet("Recipe/GetSubrecipeByRecipeId/{id}")]
        public IActionResult GetSubrecipeByRecipeId(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid Recipe ID");
            }
            var subrecipe = _db.SubRecipes.Where(p => p.RecipeId == id).ToList();

            if (subrecipe != null && subrecipe.Count > 0)
            {
                return Ok(subrecipe);
            }

            return NotFound("No subrecipe found for the given Recipe ID");
        }

        [HttpPost("Nutrition/CreateSubRecipe")]
        public IActionResult CreateSubRecipe([FromForm] SubrecipeDTO subrecipeDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid SubRecipe");
            }

            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "ImageRecipe");

            if (subrecipeDTO.SubRecipeImage == null || subrecipeDTO.SubRecipeImage.Length == 0)
            {
                return BadRequest("Image file is required.");
            }

            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            var uniqueFileName = $"{Path.GetFileNameWithoutExtension(subrecipeDTO.SubRecipeImage.FileName)}_{Guid.NewGuid()}{Path.GetExtension(subrecipeDTO.SubRecipeImage.FileName)}";

            var imageFilePath = Path.Combine(uploadFolder, uniqueFileName);

            using (var stream = new FileStream(imageFilePath, FileMode.Create))
            {
                subrecipeDTO.SubRecipeImage.CopyTo(stream);
            }

            var subRecipe = new SubRecipe
            {
                SubRecipeName = subrecipeDTO.SubRecipeName,
                PreparationTime = subrecipeDTO.PreparationTime,
                PreparationSteps = subrecipeDTO.PreparationSteps,
                SubRecipeImage = uniqueFileName, 
                Benefits = subrecipeDTO.Benefits,
                RecipeId = subrecipeDTO.RecipeId.Value
            };

            _db.SubRecipes.Add(subRecipe);
            _db.SaveChanges(); 

            return Ok(subRecipe);
        }

     
        [HttpPut("Nutrition/UpdatesubRecipe/{id}")]
        public IActionResult UpdateRecipe([FromForm] SubrecipeDTO subrecipeDTO, int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid Recipe data.");
            }

            var recipe = _db.SubRecipes.FirstOrDefault(c => c.SubRecipeId == id);
            if (recipe == null)
            {
                return NotFound(" sub Recipe not found.");
            }

            recipe.SubRecipeName = subrecipeDTO.SubRecipeName ?? recipe.SubRecipeName;
            recipe.PreparationTime = subrecipeDTO.PreparationTime ?? recipe.PreparationTime;
            recipe.PreparationSteps = subrecipeDTO.PreparationSteps ?? recipe.PreparationSteps;
            recipe.Benefits = subrecipeDTO.Benefits ?? recipe.Benefits;
            recipe.RecipeId = subrecipeDTO.RecipeId ?? recipe.RecipeId;
            
            if (subrecipeDTO.SubRecipeImage != null && subrecipeDTO.SubRecipeImage.Length > 0)
            {
                var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "ImageRecipe");

                if (!Directory.Exists(uploadFolder))
                {
                    Directory.CreateDirectory(uploadFolder);
                }

                var uniqueFileName = $"{Path.GetFileNameWithoutExtension(subrecipeDTO.SubRecipeImage.FileName)}_{Guid.NewGuid()}{Path.GetExtension(subrecipeDTO.SubRecipeImage.FileName)}";

                var imageFilePath = Path.Combine(uploadFolder, uniqueFileName);

                using (var stream = new FileStream(imageFilePath, FileMode.Create))
                {
                    subrecipeDTO.SubRecipeImage.CopyTo(stream);
                }

                recipe.SubRecipeImage = uniqueFileName ?? recipe.SubRecipeImage;
            }

            _db.SubRecipes.Update(recipe);
            _db.SaveChanges(); 

            return Ok(recipe); 
        }


        [HttpDelete("Recipe/DeleteSubrecipe/{id}")]
        public IActionResult DeleteSubrecipe(int id)
        {

            if (id <= 0)
            {
                return BadRequest("Invalid Subrecipe");
            }
            var subrecipe = _db.SubRecipes.FirstOrDefault(p => p.SubRecipeId == id);
            if (subrecipe != null)
            {

                _db.SubRecipes.Remove(subrecipe);
                _db.SaveChanges();
                return NoContent();

            }
            return NotFound("No Subrecipe Found");

        }


    }
}
