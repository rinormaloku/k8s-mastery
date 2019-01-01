namespace SA.Feedback.Model
{
    public class Feedback
    {
        public int ID { get; set; }
        public string Sentence { get; set; }
        public decimal Polarity { get; set; }
        public bool Correct { get; set; }
    }
}