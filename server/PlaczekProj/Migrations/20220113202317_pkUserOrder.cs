using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlaczekProj.Migrations
{
    public partial class pkUserOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "UserOrder",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProductId",
                table: "Order",
                type: "char(36)",
                nullable: false,
                collation: "ascii_general_ci",
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserOrder",
                table: "UserOrder",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserOrder",
                table: "UserOrder");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserOrder");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "Order",
                type: "int",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "char(36)")
                .OldAnnotation("Relational:Collation", "ascii_general_ci");
        }
    }
}
