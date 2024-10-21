namespace Project_Fitness.Server.DTO
{
    public class PersonalInfoDTO
    {
        public string? UserName { get; set; } 

        public IFormFile? UserImage { get; set; }

        public string? UserPhone { get; set; }

        public string? UserAddress { get; set; }
    }
}
