using ClosedXML.Excel;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;

using System;
using System.Data;
using System.Linq;


namespace Student_Portal_API.service
{
  public static class ExcelProcessREpository
  {
    public static DataTable GetDataTableFromWorksheet(IXLWorksheet worksheet)
    {
      var dataTable = new DataTable();

      // Assuming the first row contains column names
      var firstRow = worksheet.FirstRow();
      foreach (var cell in firstRow.Cells())
      {
        dataTable.Columns.Add(cell.Value.ToString());
      }

      var dataRows = worksheet.Rows().Skip(1); // Skip the first row as it contains column names
      foreach (var dataRow in dataRows)
      {
        var newRow = dataTable.NewRow();
        newRow[0] = 0;
        for (var i = 1; i < dataRow.Cells().Count(); i++)
        {
          newRow[i] = dataRow.Cell(i).Value;
        }
        dataTable.Rows.Add(newRow);
      }

      return dataTable;
    }
    public static DataTable ToDataTable(this ExcelWorksheet worksheet, bool hasHeaderRow = true)
    {
      var dataTable = new DataTable();

      var startRow = hasHeaderRow ? 2 : 1;
      var startColumn = 1;

      foreach (var headerCell in worksheet.Cells[startRow - 1, startColumn, startRow - 1, worksheet.Dimension.End.Column])
      {
        dataTable.Columns.Add(hasHeaderRow ? headerCell.Text : $"Column {headerCell.Start.Column}");
      }

      for (var rowNum = startRow; rowNum <= worksheet.Dimension.End.Row; rowNum++)
      {
        var row = worksheet.Cells[rowNum, startColumn, rowNum, worksheet.Dimension.End.Column];
        var dataRow = dataTable.NewRow();

        foreach (var cell in row)
        {
          dataRow[cell.Start.Column - startColumn] = cell.Text;
        }

        dataTable.Rows.Add(dataRow);
      }

      return dataTable;
    }
    public static void SaveDataTableToDatabase(DataTable dataTable, string tableName, SqlConnection connection)
    {
      using (var bulkCopy = new SqlBulkCopy(connection))
      {
        bulkCopy.DestinationTableName = tableName;
        bulkCopy.WriteToServer(dataTable);
      }
    }

    public static void ExportToExcel(string FilePath, DataTable TableToExport, string outputFileName, HttpResponse Response)
    {
      try
      {
        using (SpreadsheetWorker worker = new SpreadsheetWorker())
        {
          string filePath = FilePath;
          worker.Open(filePath);
          // string outputFileName = "Customers.xlsx";
          DataTable dataTable = TableToExport;

          worker.FillData("TemplateRow", dataTable);
          byte[] outputFileBytes = worker.SaveAs();
          worker.Close();

          Response.ClearHeaders();
          Response.ClearContent();
          Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
          Response.AddHeader("Content-Disposition", string.Format("attachment;filename={0}", outputFileName));
          Response.BinaryWrite(outputFileBytes);
          Response.Flush();
          Response.SuppressContent = true; // Prevents content from being sent to the client
          HttpContext.Current.ApplicationInstance.CompleteRequest(); // Terminates the request without raising ThreadAbortException

        }
      }
      catch (Exception ex)
      {

        throw;
      }
    }
  }
}
