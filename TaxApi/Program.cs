using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("TaxDb"));

builder.Services.AddCors(options =>
    options.AddPolicy("AllowAll",
        p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

app.UseCors("AllowAll");

// CRUD operations

// GET all records
app.MapGet("/api/taxrecords", async (AppDbContext db) =>
    await db.TaxRecords.ToListAsync());

// GET by ID
app.MapGet("/api/taxrecords/{id}", async (int id, AppDbContext db) =>
    await db.TaxRecords.FindAsync(id) is TaxRecord record
        ? Results.Ok(record)
        : Results.NotFound());

// POST create record
app.MapPost("/api/taxrecords", async (TaxRecord record, AppDbContext db) =>
{
    if (string.IsNullOrWhiteSpace(record.RecordTitle))
        return Results.BadRequest("Title is required!");

    if (record.TaxYear < 1900 || record.TaxYear > 2025)
        return Results.BadRequest("Invalid year!");

    if (record.IncomeAmount < 0)
        return Results.BadRequest("Invalid income amount!");

    if (record.DeductionsAmount < 0)
        return Results.BadRequest("Invalid deduction amount!");

    db.TaxRecords.Add(record);
    await db.SaveChangesAsync();
    return Results.Created($"/api/taxrecords/{record.Id}", record);
});

// PUT update record
app.MapPut("/api/taxrecords/{id}", async (int id, TaxRecord updated, AppDbContext db) =>
{
    if (id != updated.Id) return Results.BadRequest("Invalid record ID!");

    if (string.IsNullOrWhiteSpace(updated.RecordTitle))
        return Results.BadRequest("Title is required!");

    if (updated.TaxYear < 1900 || updated.TaxYear > 2025)
        return Results.BadRequest("Invalid year!");

    if (updated.IncomeAmount < 0)
        return Results.BadRequest("Invalid income amount!");

    if (updated.DeductionsAmount < 0)
        return Results.BadRequest("Invalid deduction amount!");

    db.Entry(updated).State = EntityState.Modified;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

// DELETE record
app.MapDelete("/api/taxrecords/{id}", async (int id, AppDbContext db) =>
{
    var record = await db.TaxRecords.FindAsync(id);
    if (record is null) return Results.NotFound();
    db.TaxRecords.Remove(record);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();

// Model
class TaxRecord
{
    public int Id { get; set; }
    public required string RecordTitle { get; set; }
    public required int TaxYear { get; set; }
    public required decimal IncomeAmount { get; set; }
    public required decimal DeductionsAmount { get; set; }
    public string? Notes { get; set; }
}

// DbContext
class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<TaxRecord> TaxRecords => Set<TaxRecord>();
}
