using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(OceanHillsES.Startup))]
namespace OceanHillsES
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //ConfigureAuth(app);
        }
    }
}
