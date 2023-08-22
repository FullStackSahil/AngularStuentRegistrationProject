using ClosedXML.Excel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using OfficeOpenXml;
using Student_Portal_API.service;
using System;
using System.Data;
using System.IO;
using System.Linq;
using System.Numerics;

namespace Student_Portal_API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ExcelInportExportController : ControllerBase
  {

    private readonly string _connectionString;
    public ExcelInportExportController(IConfiguration configuration)
    {
      _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    [HttpGet]
    public IActionResult Export()
    {
      var dataset = GetContractsAndLaborCategories(_connectionString); // Implement the method to fetch data from the database

      using (var package = new ExcelPackage())
      {
        foreach (DataTable dataTable in dataset.Tables)
        {
          var worksheet = package.Workbook.Worksheets.Add(dataTable.TableName);

          for (var i = 0; i < dataTable.Columns.Count; i++)
          {
            worksheet.Cells[1, i + 1].Value = dataTable.Columns[i].ColumnName;
          }

          for (var row = 0; row < dataTable.Rows.Count; row++)
          {
            for (var col = 0; col < dataTable.Columns.Count; col++)
            {
              worksheet.Cells[row + 2, col + 1].Value = dataTable.Rows[row][col];
            }
          }
        }

        var stream = new MemoryStream(package.GetAsByteArray());
        return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "export.xlsx");
      }
    }
    private DataSet GetContractsAndLaborCategories(string _connectionString)
    {
      using (var connection = new SqlConnection(_connectionString))
      {
        connection.Open();

        var dataSet = new DataSet();

        using (var command = new SqlCommand("SELECT * FROM _sahilContracts; SELECT * FROM _sahilLaborCategories;", connection))
        {
          using (var adapter = new SqlDataAdapter(command))
          {
            adapter.Fill(dataSet);
          }
        }

        return dataSet;
      }
    }

    private void ProcessFileWithXML(IFormFile file)
    {
      using var stream = file.OpenReadStream();
      using (var workbook = new XLWorkbook(stream))
      {
        var contractBasicInfoSheet = workbook.Worksheet("Contract Basic Info");
        var laborCategorySheet = workbook.Worksheet("Labour Category");

        using (var connection = new SqlConnection(_connectionString))
        {
          connection.Open();

          // Process Contract Basic Info sheet
          var contractBasicInfoTable = ExcelProcessREpository.GetDataTableFromWorksheet(contractBasicInfoSheet);
          ExcelProcessREpository.SaveDataTableToDatabase(contractBasicInfoTable, "_sahilContracts", connection);

          // Process Labor Category sheet
          var laborCategoryTable = ExcelProcessREpository.GetDataTableFromWorksheet(laborCategorySheet);
          ExcelProcessREpository.SaveDataTableToDatabase(laborCategoryTable, "_sahilLaborCategories", connection);
        }
      }
    }


     [HttpPost]
    public IActionResult Upload(IFormFile file)
    {
      try
      {
        if (file == null || file.Length == 0)
        {
          return BadRequest("No file uploaded.");
        }

        // Process the uploaded file using ExcelService
        ProcessFileWithXML(file);

        return Ok();
      }
      catch (Exception ex)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
      }
    }
    private void ProcessFile(IFormFile file)
    {
      using (var package = new ExcelPackage(file.OpenReadStream()))
      {
        var workbook = package.Workbook;
        var contractBasicInfoSheet = workbook.Worksheets["Contract Basic Info"];
        var laborCategorySheet = workbook.Worksheets["Labor Category"];

        using (var connection = new SqlConnection(_connectionString))
        {
          connection.Open();

          // Process Contract Basic Info sheet
          var contractBasicInfoTable = contractBasicInfoSheet.ToDataTable(true);
          ExcelProcessREpository.SaveDataTableToDatabase(contractBasicInfoTable, "_sahilContracts", connection);
          // Process Labor Category sheet
          var laborCategoryTable = laborCategorySheet.ToDataTable(true);
          ExcelProcessREpository.SaveDataTableToDatabase(laborCategoryTable, "_sahilLaborCategories", connection);

        }
      }
    }   
  }

}
