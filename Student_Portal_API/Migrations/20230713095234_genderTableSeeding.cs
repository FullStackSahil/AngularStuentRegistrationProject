using Microsoft.EntityFrameworkCore.Migrations;

namespace Student_Portal_API.Migrations
{
    public partial class genderTableSeeding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Genders",
                columns: new[] { "Id", "Description", "Title" },
                values: new object[] { 1, "Straight", "Male" });

            migrationBuilder.InsertData(
                table: "Genders",
                columns: new[] { "Id", "Description", "Title" },
                values: new object[] { 2, "Straight", "Female" });

            migrationBuilder.InsertData(
                table: "Genders",
                columns: new[] { "Id", "Description", "Title" },
                values: new object[] { 3, "LGBT", "Other" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Genders",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Genders",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Genders",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
