using System;
using System.Collections.Generic;

namespace Project_Fitness.Server.Models;

public partial class Gym
{
    public int GymId { get; set; }

    public string GymName { get; set; } = null!;

    public string? GymImage { get; set; }

    public string? GymDescription { get; set; }

    public string? GymLocation { get; set; }

    public decimal? Price { get; set; }

    public string? StartTime { get; set; }

    public string? EndTime { get; set; }

    public virtual ICollection<Subscription> Subscriptions { get; set; } = new List<Subscription>();
}
