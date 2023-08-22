using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using OfficeOpenXml;
using System;
using System.Data;
using System.IO;
using System.Threading.Tasks;

namespace Student_Portal_API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ImportExportController : ControllerBase
  {
    private readonly string uploadPath = "~/ImportExportExcel";
    private readonly string connectionString = "";
    public ImportExportController(IConfiguration configuration)
    {
      connectionString=configuration.GetConnectionString("DefaultConnection");
    }
    [HttpPost]
    public async Task<IActionResult> UploadExcel(IFormFile excelFile)
    {
      if(excelFile == null && excelFile.Length==0)
      {
        return BadRequest("Please Upload the file");
      }
      string fileName=Path.GetFileNameWithoutExtension(excelFile.FileName);
      string extension= Path.GetExtension(excelFile.FileName);
      string uniqueFileName = $"{fileName}_{Path.GetRandomFileName()}{extension}";
      string filePath = Path.Combine(Directory.GetCurrentDirectory(),uploadPath);
      using (var stream = new FileStream(filePath, FileMode.Create))
      {
        await excelFile.CopyToAsync(stream);
      }
      await ProcessExcelData(filePath);
      return Ok();
    }
    private async Task ProcessExcelData(string filePath)
    {
      using (ExcelPackage package= new ExcelPackage(new FileInfo(filePath)))
      {       
        ExcelWorksheet worksheet = package.Workbook.Worksheets[1];
        int rows = worksheet.Dimension.Rows;
        int columns = worksheet.Dimension.Columns;
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
          connection.Open();
          using (SqlTransaction transaction = connection.BeginTransaction())
          {
            try
            {
              using (SqlCommand command = new SqlCommand ("SaveExcelData", connection, transaction))
              {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@ContractId", SqlDbType.Int);
                command.Parameters.Add("@ContractName",SqlDbType.VarChar, 100);
                command.Parameters.Add("@ContractName",SqlDbType.VarChar, 100);
                command.Parameters.Add("@ContractName",SqlDbType.VarChar, 100);

              }
            }
            catch (System.Exception)
            {

              throw;
            }

          }
        }
      }
    }


   

  }
}

