using Microsoft.EntityFrameworkCore;
using Student_Portal_API.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Student_Portal_API.data
{
  public class ApplicationDbContext : DbContext
  {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {

    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);
      new DbInitializer(modelBuilder).Seed();
    }

    // Db sets
    public DbSet<Student> Students { get; set; }
    public DbSet<Gender> Genders { get; set; }
    public DbSet<Address> Addresses { get; set; }
    public DbSet<Country> Countries { get; set; }
    public DbSet<State> States { get; set; }
    public DbSet<City> Cities { get; set; }


  }
  public class DbInitializer
  {
    private readonly ModelBuilder modelBuilder;

    public DbInitializer(ModelBuilder modelBuilder)
    {
      this.modelBuilder = modelBuilder;
    }

    public void Seed()
    {
      //modelBuilder.Entity<Country>().HasData(
      //       new Country() { Id = 1, Name = "india" },
      //       new Country() { Id = 2, Name = "Nepal" }
      //       );
      //modelBuilder.Entity<State>().HasData(
      //       new State() { Id = 1, Name = "Himachal Pradesh", CountryId = 1 },
      //       new State() { Id = 2, Name = "Punjab", CountryId = 1 },
      //       new State() { Id = 3, Name = "Kathmandu", CountryId = 2 },
      //       new State() { Id = 4, Name = "Lumbani", CountryId = 2 }
      //       );
      //modelBuilder.Entity<City>().HasData(
      //  new City { Id = 1, Name = "Hamirpur City", StateId = 1 },
      //  new City { Id = 2, Name = "Kangra city", StateId = 1 },
      //  new City { Id = 3, Name = "Mohali City", StateId = 2 },
      //  new City { Id = 4, Name = "Amtrisar City", StateId = 2 },
      //  new City { Id = 5, Name = "Kathmandu City", StateId = 3 },
      //  new City { Id = 6, Name = "LumbaniCity", StateId = 4 }
      //       );
      modelBuilder.Entity<Gender>().HasData(
            new Gender() { Id = 1, Title="Male",Description="Straight" },
            new Gender() { Id = 2, Title="Female",Description="Straight" },
            new Gender() { Id = 3, Title="Other",Description="LGBT" }            
            );


    }
  }
}
