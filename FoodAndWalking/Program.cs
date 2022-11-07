var builder = WebApplication.CreateBuilder(args);
string policy = "MyPolicy";

// Add services to the container.
builder.Services.AddRazorPages();

builder.Services.AddControllersWithViews();
builder.Services.AddAntiforgery(options =>
{
    options.HeaderName = "XSRF-TOKEN";
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: policy, build =>
    {
        //build.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
        build.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
        //build.WithHeaders("*");
        //build.WithOrigins("*");
        //build.WithMethods("*");

    });
});

var app = builder.Build();
app.UseCors(policy);
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
