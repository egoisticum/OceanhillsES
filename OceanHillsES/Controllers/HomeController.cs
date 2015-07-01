using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OceanHillsES.Extensions;
namespace OceanHillsES.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Contact()
        {
            return View();
        }
        public ActionResult Vivienda1()
        {
            return View();
        }
        public ActionResult Vivienda2()
        {
            return View();
        }
        public ActionResult Vivienda3()
        {
            return View();
        }
        #region Sending Email
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        public bool HandleContactForm(String messageName, String messageFromEmail, String messageFromPhone, String messageFromCompany, String messageBody)
        {
            bool success = false;
            try
            {
                //Send out email

                String messageTo = "info@mss.ba";
                success = EmailHelper.SendContactEmail(messageName, messageFromEmail, messageTo, messageBody);
            }
            catch (Exception ex)
            {
                success = false;
            }

            return success;
        }

        #endregion
    }
}