using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_Fitness.Server.DTO;
using Project_Fitness.Server.Models;

namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipsController : ControllerBase
    {
        private readonly MyDbContext _db;
        public TipsController(MyDbContext db) { _db = db; }

        [HttpGet("Nutrition/GetAllTips")]
        public IActionResult GetAllTips()
        {
            var tip = _db.Tips.ToList();
            if (tip == null)
            {
                return NoContent();
            }
            return Ok(tip);

        }

        [HttpGet("Nutrition/GetTipsById/{id}")]
        public IActionResult GetTipsById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid Tip ID");
            }
            var tip = _db.Tips.Where(p => p.TipsId == id).FirstOrDefault();
            if (tip == null)
            {
                return NotFound("No Tip found for the given Tip ID");
            }
            return Ok(tip);
        }
        [HttpPost("Nutrition/CreateTips")]
        public IActionResult CreateTips([FromForm] TipDTO tipDTO)
        {
            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "ImageRecipe");

            if (tipDTO.TipsImage == null || tipDTO.TipsImage.Length == 0)
            {
                return BadRequest("Image file is required.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid Tip data.");
            }

            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            var imageFilePath = Path.Combine(uploadFolder, tipDTO.TipsImage.FileName);

            using (var stream = new FileStream(imageFilePath, FileMode.Create))
            {
                tipDTO.TipsImage.CopyTo(stream);
            }

            var tip = new Tip
            {
                TipsName = tipDTO.TipsName,
                TipsImage = tipDTO.TipsImage.FileName,
                TipsDescription = tipDTO.TipsDescription
            };

            _db.Tips.Add(tip);
            _db.SaveChanges();

            return Ok(tip); 
        }
        [HttpPut("Nutrition/UpdateTips/{id}")]
        public IActionResult UpdateTips([FromForm] TipDTO tipDTO, int id)
        {
            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "ImageTips");

            var tip = _db.Tips.FirstOrDefault(c => c.TipsId == id);
            if (tip == null) return NotFound(); 

            tip.TipsName = tipDTO.TipsName ?? tip.TipsName; 
            tip.TipsDescription= tipDTO.TipsDescription ?? tip.TipsDescription;
            if (tipDTO.TipsImage != null)
            {
                if (!Directory.Exists(uploadFolder))
                {
                    Directory.CreateDirectory(uploadFolder);
                }

                var imageFilePath = Path.Combine(uploadFolder, tipDTO.TipsImage.FileName);

                using (var stream = new FileStream(imageFilePath, FileMode.Create))
                {
                    tipDTO.TipsImage.CopyTo(stream); 
                }

                tip.TipsImage = tipDTO.TipsImage.FileName ?? tip.TipsImage;
            }

            _db.Tips.Update(tip);
            _db.SaveChanges();

            return Ok(tip); 
        }


        [HttpDelete("Nutritiom/DeleteTips/{id}")]
        public IActionResult DeleteTips(int id)
        {

            if (id <= 0)
            {
                return BadRequest("Invalid Tips");
            }
            var tip = _db.Tips.FirstOrDefault(p => p.TipsId == id);
            if (tip != null)
            {

                _db.Tips.Remove(tip);
                _db.SaveChanges();
                return NoContent();

            }
            return NotFound("No Tip found");


        }

        [HttpGet("getImages/{imageName}")]
        public IActionResult getImage(string imageName)
        {

            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "ImageRecipe", imageName);
            if (System.IO.File.Exists(pathImage))
            {
                return PhysicalFile(pathImage, "image/*");
            }

            return NotFound();
        }
    }
}
