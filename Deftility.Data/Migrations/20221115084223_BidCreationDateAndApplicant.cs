using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Deftility.Data.Migrations
{
    public partial class BidCreationDateAndApplicant : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApplicantId",
                table: "Bids",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "Bids",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_Bids_ApplicantId",
                table: "Bids",
                column: "ApplicantId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bids_AspNetUsers_ApplicantId",
                table: "Bids",
                column: "ApplicantId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bids_AspNetUsers_ApplicantId",
                table: "Bids");

            migrationBuilder.DropIndex(
                name: "IX_Bids_ApplicantId",
                table: "Bids");

            migrationBuilder.DropColumn(
                name: "ApplicantId",
                table: "Bids");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "Bids");
        }
    }
}
