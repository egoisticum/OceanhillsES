using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;

namespace OceanHillsES.Extensions
{
    public static class EmailHelper
    {
        public static SmtpClient GetSmtpClient()
        {
            //Set values by hard-codding
            var server = "mail.mss.ba";
            var user = "test@mss.ba";
            var pass = "Error9789";
            var port = "587";

            //Create new SmtpClient
            var smtp = new SmtpClient();
            smtp.Host = server;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential(user, pass);
            smtp.EnableSsl = true;
            smtp.Port = Convert.ToInt32(port);
            //Return the SMTP object
            return smtp;
        }


        public static bool SendContactEmail(String messageName, String messageFromEmail, String messageTo, String messageBody)
        {
            try
            {
                //Get default SMTP server settings from our contact page model
                messageBody = "Name: " + messageName + "<br/>" + "Email adress: " + messageFromEmail + "<br/>" + "Poruka: " + messageBody;
                messageFromEmail = "test@mss.ba";

                //Create email address with friendly display names
                MailAddress emailAddressFrom = new MailAddress(messageFromEmail, "Oceanhills.es contact requests");
                MailAddress emailAddressTo = new MailAddress(messageTo, "Oceanhills.es contact requests");

                //Generate an email message object to send
                MailMessage email = new MailMessage(emailAddressFrom, emailAddressTo);
                email.Subject = "Oceanhills.es - web contact request";
                email.Body = messageBody;
                email.IsBodyHtml = true;
                /*hack for turning of security*/
                TurnOffSecurity();

                //Connect to SMTP using MailChimp transactional email service Mandrill
                //This uses the values on the homenode OR fallback to test details above
                SmtpClient smtp = GetSmtpClient();

                //Try & send the email with the SMTP settings
                //InitiateSSLTrust();
                smtp.Send(email);
            }
            catch (Exception ex)
            {
                //Throw an exception if there is a problem sending the email
                return false;
            }
            return true;
        }

        private static void TurnOffSecurity()
        {
            ServicePointManager.ServerCertificateValidationCallback =
    delegate(object s, X509Certificate certificate,
             X509Chain chain, SslPolicyErrors sslPolicyErrors)
    { return true; };
        }

        public static void InitiateSSLTrust()
        {
            try
            {
                //Change SSL checks so that all checks pass
                ServicePointManager.ServerCertificateValidationCallback =
                    new RemoteCertificateValidationCallback(
                        delegate
                        { return true; }
                    );
            }
            catch (Exception ex)
            {
                //ActivityLog.InsertSyncActivity(ex);
            }
        }
    }
}
