using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API_VidiVici.Data.Migrations
{
    /// <inheritdoc />
    public partial class ChangedPartner : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "09cd8ab1-b370-4977-8851-5e9b8309f773");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "23a6c1e5-5b8e-41a1-b3e6-ab26c3743af0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ab8011b1-4799-4a93-9b8c-7b2198ea74c0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c3585b99-e99c-4c54-863d-8a2b5a580627");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c936fd03-a9f8-4026-a2c5-0dc809651d9c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f77d23a1-726c-4769-a161-b37595eba3c8");

            migrationBuilder.AddColumn<string>(
                name: "CompanyName",
                table: "Partners",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ReturningType",
                table: "Funds",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "002f68b0-db77-4fc8-b16c-e4fe8c308e3c", null, "Prospect", "PROSPECT" },
                    { "18b5d538-af67-42b3-8c83-62c0c1445b9e", null, "Pending", "PENDING" },
                    { "6ad44ed0-c8e8-4c15-afbb-6a9fb99e402b", null, "Investor", "INVESTOR" },
                    { "6f2f9cb0-b6f0-4fb9-97e2-7ce9075723c1", null, "Poweruser", "POWERUSER" },
                    { "bf907878-973e-471c-801a-39dec3189a55", null, "Employee", "EMPLOYEE" },
                    { "ffc110d4-b1c9-4397-b67e-c016457a71ab", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "002f68b0-db77-4fc8-b16c-e4fe8c308e3c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "18b5d538-af67-42b3-8c83-62c0c1445b9e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6ad44ed0-c8e8-4c15-afbb-6a9fb99e402b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6f2f9cb0-b6f0-4fb9-97e2-7ce9075723c1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bf907878-973e-471c-801a-39dec3189a55");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ffc110d4-b1c9-4397-b67e-c016457a71ab");

            migrationBuilder.DropColumn(
                name: "CompanyName",
                table: "Partners");

            migrationBuilder.AlterColumn<int>(
                name: "ReturningType",
                table: "Funds",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "09cd8ab1-b370-4977-8851-5e9b8309f773", null, "Pending", "PENDING" },
                    { "23a6c1e5-5b8e-41a1-b3e6-ab26c3743af0", null, "Investor", "INVESTOR" },
                    { "ab8011b1-4799-4a93-9b8c-7b2198ea74c0", null, "Employee", "EMPLOYEE" },
                    { "c3585b99-e99c-4c54-863d-8a2b5a580627", null, "Admin", "ADMIN" },
                    { "c936fd03-a9f8-4026-a2c5-0dc809651d9c", null, "Prospect", "PROSPECT" },
                    { "f77d23a1-726c-4769-a161-b37595eba3c8", null, "Poweruser", "POWERUSER" }
                });
        }
    }
}
