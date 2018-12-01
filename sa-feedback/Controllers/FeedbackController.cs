using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SA.Feedback.Model;

namespace SA.Feedback.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly FeedbackContext _feedbackContext;

        public FeedbackController(FeedbackContext feedbackContext)
        {
            _feedbackContext = feedbackContext;
        }

        [HttpPost]
        public async Task Post([FromBody] Model.Feedback feedback)
        {
            _feedbackContext.Feedback.Add(feedback);
            await _feedbackContext.SaveChangesAsync();
        }
    }
}
