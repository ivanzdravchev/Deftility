using Microsoft.EntityFrameworkCore.Migrations;

namespace Deftility.Data.Migrations
{
    public partial class JobEntityEdit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_AspNetUsers_WorkerId",
                table: "Jobs");

            migrationBuilder.DropIndex(
                name: "IX_Jobs_WorkerId",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "FixedPrice",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "HourlyHighestRate",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "HourlyLowestRate",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "WorkerId",
                table: "Jobs");

            migrationBuilder.AddColumn<int>(
                name: "HighestRate",
                table: "Jobs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "LowestRate",
                table: "Jobs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HighestRate",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "LowestRate",
                table: "Jobs");

            migrationBuilder.AddColumn<int>(
                name: "FixedPrice",
                table: "Jobs",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "HourlyHighestRate",
                table: "Jobs",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "HourlyLowestRate",
                table: "Jobs",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WorkerId",
                table: "Jobs",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_WorkerId",
                table: "Jobs",
                column: "WorkerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_AspNetUsers_WorkerId",
                table: "Jobs",
                column: "WorkerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
