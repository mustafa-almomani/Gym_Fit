namespace Project_Fitness.Server.DTO
{
    public class AddGymDTO
    {
        public string? GymName { get; set; }

        public IFormFile? GymImage { get; set; }

        public string? GymDescription { get; set; }

        public string? GymLocation { get; set; }

        public decimal? Price { get; set; }

        public string? StartTime { get; set; }

        public string? EndTime { get; set; }
    }
}
