using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Student_Portal_API.data;
using Student_Portal_API.Model;
using Student_Portal_API.service;
using Student_Portal_API.ViewModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Student_Portal_API.Controllers
{
  [Route("api/students")]
  [ApiController]
  public class StudentsController : ControllerBase
  {
    internal readonly IStudentRepository _studentRepository;
    private readonly ApplicationDbContext _context;
    public StudentsController(IStudentRepository studentRepository, ApplicationDbContext context)
    {
      _studentRepository = studentRepository;
      _context = context;
    }

    //[Route("[action]")]
    [HttpGet("GetAllStudents")]
    public async Task<IActionResult> GetAllStudents()
    {
      //return Ok( await _context.Students.Include(nameof(Gender)).Include(nameof(Address)).ToListAsync());
      return Ok(await _studentRepository.GetAllStudentsAsync());
    }
    //[Route("[action]/{id:int}")]
    [HttpGet("GetStudent/{id:int}")]
    public async Task<IActionResult> GetStudent(int id)
    {
      //return Ok(await _context.Students.Where(x => x.Id == id).Include(nameof(Gender)).Include(nameof(Address)).FirstOrDefaultAsync());
      return Ok(await _studentRepository.GetStudentAsync(id));
    }
    //[HttpPut("{id:int}")]
    [HttpPut("UpdateStudent/{id:int}")]
    //[Route("[action]/{id:int}")]
    public async Task<IActionResult> UpdateStudent([FromRoute] int id, [FromBody] UpdateStudentVM student)
    {
      if (await _studentRepository.Exists(id))
      {
        var updateStudent = await _studentRepository.UpdateStudentAsync(id, student);
        if (updateStudent != null)
          return Ok(updateStudent);
      }
      return NotFound();

    }
    [HttpDelete("DeleteStudent/{id:int}")]
    //[Route("[action]/{id:int}")]
    public async Task<IActionResult> DeleteStudent([FromRoute] int id)
    {
      if (await _studentRepository.Exists(id))
      {
        var deleteStudent = await _studentRepository.DeleteStudentAsync(id);
        if (deleteStudent != false)
          return Ok();
      }
      return NotFound();

    }
    [HttpPost("AddStudent")]
    //[Route("[action]")]
    public async Task<IActionResult> AddStudent([FromBody] UpdateStudentVM studentVm)
    {
      if (studentVm != null)
      {
        //var profilePath = await _studentRepository.AddImage(profileImage);
        //studentVm.ProfileImage = profilePath;
        var newStudent = await _studentRepository.AddStudent(studentVm);
        if (newStudent != null)
          return Ok(newStudent);
      }
      return BadRequest(new { message = "Student is Not valid" });

    }
    [HttpPost("UploadImage/{id}")]
    //[Route("[action]/{id}")]
    public async Task<IActionResult> UploadImage([FromRoute] int id, IFormFile profileImage)
    {
      var extension = new List<string>
            {
                ".jpeg",".png",".jpg"
            };
      if (profileImage != null && profileImage.Length > 0)
      {
        var fileExtension = Path.GetExtension(profileImage.FileName);
        if (extension.Contains(fileExtension))
        {
          var profilePath = await _studentRepository.AddImage(profileImage);

          if (await _studentRepository.Exists(id))
          {
            if (await _studentRepository.UpdateImage(id, profilePath))
              return Ok(profilePath);
            else
              return StatusCode(StatusCodes.Status500InternalServerError, "Error in image updating");

          }
          return Ok(profilePath);
        }
      }
      return BadRequest("This extension does not match please provide valid extension file ");


    }

  }
}
