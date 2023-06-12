using Microsoft.EntityFrameworkCore.Diagnostics;
using Student_Portal_API.Model;
using Student_Portal_API.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Student_Portal_API.service
{
  public interface ICountryStateCityRepository
    {
        Task<List<Country>> GetAllCountryAsync();
        Task<List<State>> GetAllStatesAsync();
        Task<List<City>> GetAllCitiesAsync();
        Task<List<State>> GetStateByCountryIdAsync(int countryId);
        Task<List<City>> GetCityByStateIdAsync(int stateId);
        Task<Country> AddCountry(Country country);
        Task<State> AddState(State ste);
        Task<City> AddCity(City city);
        Task<bool> StateExists(int id);
        Task<bool> CountryExists(int id);
        Task<bool> CityExists(int id);
        Task<bool>RemoveStateAsync(int id);
        Task<bool>RemoveCountryAsync(int id);
        Task<bool>RemoveCityAsync(int id);
        Task<State> GetStateAsync(int id);
        Task<Country> GetCountryAsync(int id);
        Task<City> GetCityAsync(int id);
  }
}
