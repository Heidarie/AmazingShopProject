using log4net;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PlaczekProj.Models.DatabaseModels;

namespace PlaczekProj.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        private ILog logger;
        private DatabaseManager dbManager;
        

        protected DatabaseManager DatabaseManager
        {
            get
            {
                if(dbManager == null)
                {
                    dbManager = new DatabaseManager(); 
                }
                return dbManager;
            }
        }

        protected ILog Logger
        {
            get
            {
                if (logger == null)
                    logger = LogManager.GetLogger(this.GetType());
                return logger;
            }
        }
    }
}
