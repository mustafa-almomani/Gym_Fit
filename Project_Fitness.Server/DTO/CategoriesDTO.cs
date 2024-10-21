namespace Project_Fitness.Server.DTO
{
    public class CategoriesDTO
    {
   
       
            public string CategoryName { get; set; } = null!;
            public string? Description { get; set; }

        public IFormFile? ImageFile { get; set; }  // For file upload

        //public string? Image { get; set; }  // For storing the image URL (path)
    }
    }


