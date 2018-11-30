using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SA.Feedback.Model;

namespace SA.Feedback
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            
            // Override env variable DATABASE_DIR to specify directory
            services.AddDbContext<FeedbackContext>(options =>
                options.UseSqlite($"Data Source={Configuration["DATABASE_DIR"]}/Feedback.db"));
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            MigrateDatabase(app);
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseMvc();
        }

        private static void MigrateDatabase(IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                scope.ServiceProvider.GetService<FeedbackContext>().Database.Migrate();
            }
        }
    }
}
