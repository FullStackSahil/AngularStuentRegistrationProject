using Microsoft.EntityFrameworkCore;
using Student_Portal_API.data;
using Student_Portal_API.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Student_Portal_API.service
{
  public class CountryStateCityRepository : ICountryStateCityRepository
  {

    private readonly ApplicationDbContext _context;
    public CountryStateCityRepository(ApplicationDbContext context)
    {
      _context = context;
    }

    public async Task<City> AddCity(City city)
    {
      try
      {
        if (city == null) return null;
        await _context.Cities.AddAsync(city);
        _context.SaveChanges();
        return city;
      }
      catch (Exception)
      {
        throw;
      }
    }

    public async Task<Country> AddCountry(Country country)
    {
      try
      {
        if (country == null) return null;
        await _context.Countries.AddAsync(country);
        _context.SaveChanges();
        return country;
      }
      catch (Exception)
      {

        throw;
      }

    }

    public async Task<State> AddState(State ste)
    {
      try
      {
        if (ste == null) return null;
        await _context.States.AddAsync(ste);
        _context.SaveChanges();
        return ste;
      }
      catch (Exception)
      {

        throw;
      }
    }

    public async Task<List<City>> GetAllCitiesAsync()
    {
      return await _context.Cities.ToListAsync();

    }

    public async Task<List<Country>> GetAllCountryAsync()
    {
      return await _context.Countries.ToListAsync();
    }

    public async Task<List<State>> GetAllStatesAsync()
    {
      return await _context.States.ToListAsync();

    }

    public async Task<List<City>> GetCityByStateIdAsync(int stateId)
    {
      var city = await _context.Cities.Include(x => x.State).Where(x => x.StateId == stateId).ToListAsync();
      return city;
    }

    public async Task<List<State>> GetStateByCountryIdAsync(int countryId)
    {
      var state = await _context.States.Include(x => x.Country).Where(x => x.CountryId == countryId).ToListAsync();
      return state;
    }
  }
}
