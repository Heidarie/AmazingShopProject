using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace PlaczekProj.Enums
{
    public class Enums
    {
        public enum Status
        {
            [Display(Name = "Koszyk")]
            Koszyk = 0,
            [Display(Name = "Potwierdzone")]
            Potwierdzone = 1,
            [Display(Name = "Wysłane")]
            Wysłane = 2,
            [Display(Name = "Odebrane")]
            Odebrane = 3,
            [Display(Name = "Anulowane")]
            Anulowane = 4
        }
        public enum DeliveryType
        {
            [Display(Name = "Odbiór osobisty")]
            Odbiór = 0,
            [Display(Name = "Dostawa")]
            Dostawa = 1
        }
        public enum SortType
        {
            Ascending = 0,
            Descending = 1
        }
    }
}
