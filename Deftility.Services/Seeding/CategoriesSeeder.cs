using Deftility.Data;
using Deftility.Services.Contracts;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Deftility.Services.Seeding
{
    public class CategoriesSeeder : ISeeder
    {
        public async Task SeedAsync(ApplicationDbContext context, IServiceProvider serviceProvider)
        {
            if (!context.Categories.Any())
            {
                var categoriesService = serviceProvider.GetRequiredService<ICategoriesService>();

                // better for this to be imported from a json (someday but not today)
                var categoriesList = new List<string>()
                {
                    "Adobe",
                    "Amazon Web Services",
                    "Android Studio",
                    "Animation",
                    "Art",
                    "Audio Editing",
                    "API",
                    "AutoCAD",
                    "AngularJS",
                    "Branding",
                    "Blockchain",
                    "Bots",
                    "Blender3D",
                    "Brochure Design",
                    "CSS",
                    "C++",
                    "Copywriting",
                    "CorelDRAW",
                    "Chemistry",
                    "C#",
                    "Cybersecurity",
                    "Digital Art",
                    "Data Mining",
                    "Data Science",
                    "Deep Learning",
                    "Electronics",
                    "Editing & Proofreading",
                    "Electrical Engineering",
                    "Fashion Design",
                    "Finances",
                    "Flyer Design",
                    "Game Design & Development",
                    "Google Ads",
                    "Graphic Design",
                    "HTML",
                    "iOS App Development",
                    "Interior Design",
                    "JavaScript",
                    "Logo Creation",
                    "Linux",
                    "Microsoft Excel",
                    "Microsoft Word",
                    "Magento",
                    "Mechanical Engineering",
                    "Music",
                    "Marketing",
                    "Mathematics",
                    "PHP",
                    "Photo Editing",
                    "Python",
                    "Responsive Web Designer",
                    "ReactJS",
                    "Raspberry Pi",
                    "Salesforce",
                    "SEO",
                    "SQL",
                    "Translation",
                    "Unity",
                    "UI/UX Design",
                    "Video Editing",
                    "Voice Acting/Recording",
                    "VueJS",
                    "WebGL",
                    "Writing",
                    "WordPress",
                    "Website Development",
                    "Web Scraping",
                    "Xamarin"
                };

                await categoriesService.AddRangeAsync(categoriesList);
            }
        }
    }
}
