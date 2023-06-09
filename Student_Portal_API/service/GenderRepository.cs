using Microsoft.EntityFrameworkCore;
using Student_Portal_API.data;
using Student_Portal_API.Model;
using Student_Portal_API.service.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Student_Portal_API.service
{
    public class GenderRepository: IGenderRepository
    {
        private readonly ApplicationDbContext _context;

        public GenderRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<Gender>> GetGenderAsync()
        {
            return await _context.Genders.ToListAsync();
        }
    }
}
