using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_Fitness.Server.DTO;
using Project_Fitness.Server.Models;
using Project_Fitness.Server.Services;

namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly PayPalPaymentServiceForSub _paymentService;

        public AdminController(MyDbContext context, PayPalPaymentServiceForSub paymentService)

        {
            _paymentService = paymentService;
            _context = context;

        }
        [HttpPost("AddNewGym")]
        public async Task<IActionResult> AddNewGym([FromForm] AddGymDTO add)
        {
            if (add.GymImage != null && add.GymImage.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                try
                {

                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + add.GymImage.FileName;
                    var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);


                    using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                    {
                        await add.GymImage.CopyToAsync(fileStream);
                    }


                    var newGym = new Gym
                    {
                        GymName = add.GymName,
                        GymImage = $"/images/{uniqueFileName}",
                        GymDescription = add.GymDescription,
                        Price = add.Price,
                        GymLocation = add.GymLocation,
                        StartTime = add.StartTime,
                        EndTime = add.EndTime,
                    };


                    _context.Gyms.Add(newGym);
                    await _context.SaveChangesAsync();

                    return Ok(newGym);
                }
                catch (Exception ex)
                {

                    return StatusCode(500, "An error occurred while processing your request.");
                }
            }


            return BadRequest("Invalid data or missing image.");
        }

        [HttpGet("GetAllGym")]
        public async Task<IActionResult> GetAllGym()
        {
            var allgyms = await _context.Gyms.ToListAsync();

            return Ok(allgyms);
        }

        [HttpPut("UpdateGymById/{id}")]
        public async Task<IActionResult> UpdateGymById(int id, [FromForm] AddGymDTO updateGymDTO)
        {
            if (id <= 0)
            {
                return BadRequest("The ID cannot be zero or negative.");
            }

            var gym = await _context.Gyms.FirstOrDefaultAsync(x => x.GymId == id);
            if (gym == null)
            {
                return NotFound("No Gym found with the specified ID.");
            }

            try
            {
                if (updateGymDTO.GymImage != null && updateGymDTO.GymImage.Length > 0)
                {
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");


                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + updateGymDTO.GymImage.FileName;
                    var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);


                    using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                    {
                        await updateGymDTO.GymImage.CopyToAsync(fileStream);
                    }


                    gym.GymImage = $"/images/{uniqueFileName}";
                }


                gym.GymName = updateGymDTO.GymName ?? gym.GymName;
                gym.GymLocation = updateGymDTO.GymLocation ?? gym.GymLocation;
                gym.Price = updateGymDTO.Price ?? gym.Price;
                gym.GymDescription = updateGymDTO.GymDescription ?? gym.GymDescription;
                gym.StartTime = updateGymDTO.StartTime ?? gym.StartTime;
                gym.EndTime = updateGymDTO.EndTime ?? gym.EndTime;


                await _context.SaveChangesAsync();

                return Ok(gym);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


        [HttpDelete("DeletGymById/{id}")]
        public async Task<IActionResult> DeleteGymById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("The id can not be zero or negative value");
            }
            var gym = await _context.Gyms.FirstOrDefaultAsync(x => x.GymId == id);
            if (gym == null)
            {
                return BadRequest("No Gym found with this id");
            }
            _context.Gyms.Remove(gym);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("GetAllFitnessClass")]
        public async Task<IActionResult> GetAllFitnessClass()
        {
            var allFitnessClasses = await _context.FitnessClasses.ToListAsync();

            return Ok(allFitnessClasses);
        }

        [HttpPost("AddNewFitnessClass")]
        public async Task<IActionResult> AddNewFitnessClass([FromForm] AddFitnessClassDTO add)
        {
            if (add.FitnessClassesImage != null && add.FitnessClassesImage.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                try
                {

                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + add.FitnessClassesImage.FileName;
                    var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);


                    using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                    {
                        await add.FitnessClassesImage.CopyToAsync(fileStream);
                    }


                    if (!TimeOnly.TryParse(add.StartTime, out TimeOnly startTime) ||
                        !TimeOnly.TryParse(add.EndTime, out TimeOnly endTime))
                    {
                        return BadRequest("Invalid start or end time format.");
                    }


                    var fitness = new FitnessClass
                    {
                        FitnessClassesName = add.FitnessClassesName,
                        FitnessClassesImage = $"/images/{uniqueFileName}",
                        FitnessClassesDescription = add.FitnessClassesDescription,
                        Price = add.Price,
                        FitnessClassesLocation = add.FitnessClassesLocation,
                        Days = add.Days,
                        StartTime = startTime,
                        EndTime = endTime
                    };


                    _context.FitnessClasses.Add(fitness);
                    await _context.SaveChangesAsync();

                    return Ok(fitness);
                }
                catch (Exception ex)
                {

                    return StatusCode(500, "An error occurred while processing your request.");
                }
            }
            // GET: api/Carts
            [HttpGet("get/cartDate")]
            async Task<ActionResult<IEnumerable<CartDTO>>> GetCarts()
            {
                var carts = await _context.Carts
                    .Include(c => c.CartItems)
                    .Select(c => new CartDTO
                    {
                        Id = c.Id,
                        UserId = c.UserId,
                        CreatedDate = c.CreatedDate,
                        CartItems = c.CartItems.Select(ci => new CartitemDTO
                        {
                            ProductId = ci.ProductId,
                            Quantity = ci.Quantity,
                            Price = ci.Price
                        }).ToList()
                    })
                    .ToListAsync();

                return Ok(carts);
            }


            return BadRequest("Invalid data or missing image.");
        }

        [HttpPut("UpdateFitnessClassById/{id}")]
        public async Task<IActionResult> UpdateFitnessClassById(int id, [FromForm] AddFitnessClassDTO updateFitnessClassDTO)
        {
            if (id <= 0)
            {
                return BadRequest("The ID cannot be zero or negative.");
            }

            var fitness = await _context.FitnessClasses.FirstOrDefaultAsync(x => x.FitnessClassesId == id);
            if (fitness == null)
            {
                return NotFound("No Gym found with the specified ID.");
            }

            try
            {
                if (updateFitnessClassDTO.FitnessClassesImage != null && updateFitnessClassDTO.FitnessClassesImage.Length > 0)
                {
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");


                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + updateFitnessClassDTO.FitnessClassesImage.FileName;
                    var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);


                    using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                    {
                        await updateFitnessClassDTO.FitnessClassesImage.CopyToAsync(fileStream);
                    }


                    fitness.FitnessClassesImage = $"/images/{uniqueFileName}";
                }


                fitness.FitnessClassesName = updateFitnessClassDTO.FitnessClassesName ?? fitness.FitnessClassesName;
                fitness.FitnessClassesLocation = updateFitnessClassDTO.FitnessClassesLocation ?? fitness.FitnessClassesLocation;
                fitness.Price = updateFitnessClassDTO.Price ?? fitness.Price;
                fitness.FitnessClassesDescription = updateFitnessClassDTO.FitnessClassesDescription ?? fitness.FitnessClassesDescription;
                fitness.Days = updateFitnessClassDTO.Days ?? fitness.Days;
                if (!string.IsNullOrEmpty(updateFitnessClassDTO.StartTime))
                {
                    fitness.StartTime = TimeOnly.Parse(updateFitnessClassDTO.StartTime);
                }

                if (!string.IsNullOrEmpty(updateFitnessClassDTO.EndTime))
                {
                    fitness.EndTime = TimeOnly.Parse(updateFitnessClassDTO.EndTime);
                }


                await _context.SaveChangesAsync();

                return Ok(fitness);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpDelete("DeleteFitnessClassById/{id}")]
        public async Task<IActionResult> DeleteFitnessClassById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("The id can not be zero or negative value");
            }
            var fitness = await _context.FitnessClasses.FirstOrDefaultAsync(x => x.FitnessClassesId == id);
            if (fitness == null)
            {
                return BadRequest("No Fitness Class found with this id");
            }
            _context.FitnessClasses.Remove(fitness);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpGet("GetGymById/{id:int}")]
        public async Task<IActionResult> GetGym(int id)
        {
            if (id <= 0)
            {
                return BadRequest("ID cannot be zero or less.");
            }

            var gym = await _context.Gyms.Where(c => c.GymId == id).FirstOrDefaultAsync();
            if (gym == null)
            {
                return NotFound();
            }

            return Ok(gym);
        }
        [HttpGet("GetClassById/{id:int}")]
        public async Task<IActionResult> GetClass(int id)
        {
            if (id <= 0)
            {
                return BadRequest("ID cannot be zero or less.");
            }

            var Fitness = await _context.FitnessClasses.Where(c => c.FitnessClassesId == id).FirstOrDefaultAsync();
            if (Fitness == null)
            {
                return NotFound();
            }

            return Ok(Fitness);
        }
        //[HttpGet("GetGymByName")]
        //public async Task<IActionResult> GetGymByName([FromBody] string name) {
        //    if (string.IsNullOrEmpty(name)) {
        //        return BadRequest("name can not be empty or null");
        //    }
        //    var gyms= await _context.Gyms.Where(x=>x.GymName==name).ToListAsync();
        //    if (gyms == null) { return NotFound("no gym under this name "); }
        //    return Ok(gyms);
        //}
        [HttpGet("GetGymByName")]
        public async Task<IActionResult> GetGymByName([FromQuery] string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest("Name cannot be empty or null.");
            }

            var gyms = await _context.Gyms
                                     .Where(x => x.GymName == name)
                                     .ToListAsync();

            if (!gyms.Any())
            {
                return NotFound("No gym found with this name.");
            }

            return Ok(gyms);
        }
        [HttpGet("GetClassByName")]
        public async Task<IActionResult> GetClassByName([FromQuery] string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest("Name cannot be empty or null.");
            }

            var Fitness = await _context.FitnessClasses
                                     .Where(x => x.FitnessClassesName == name)
                                     .ToListAsync();

            if (!Fitness.Any())
            {
                return NotFound("No Class found with this name.");
            }

            return Ok(Fitness);

        }
        [HttpPost("create-payment")]
        public IActionResult CreatePayment([FromBody] CreatePaymentRequestDto request)
        {
            try
            {
                var payment = _paymentService.CreatePayment(request.RedirectUrl, request.Total, request.Message, request.UserId);

                // Find the approval URL
                var approvalUrl = payment.links.FirstOrDefault(l => l.rel == "approval_url")?.href;
                if (approvalUrl != null)
                {
                    return Ok(new { approvalUrl });
                }

                return BadRequest("Payment could not be created.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Step 2: Execute PayPal payment
        [HttpPost("execute-payment")]
        public IActionResult ExecutePayment([FromBody] ExecutePaymentRequestDto request)
        {
            try
            {
                var executedPayment = _paymentService.ExecutePayment(request.PaymentId, request.PayerId);

                if (executedPayment.state.ToLower() == "approved")
                {
                    _paymentService.CreateSubscriptionAndPayment(
                        (int)request.UserId,
                       request.GymId != 0 ? request.GymId : (int?)null,
                       request.FitnessClassId != 0 ? request.FitnessClassId : (int?)null,
                        request.StartDate,
                        request.EndDate,
                        request.Total,
                        "PayPal",
                        request.PaymentId,
                        executedPayment.id);

                    return Ok("Payment executed and subscription created successfully.");
                }

                return BadRequest("Payment could not be approved.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
