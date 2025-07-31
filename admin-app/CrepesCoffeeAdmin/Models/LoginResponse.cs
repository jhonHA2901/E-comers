using Newtonsoft.Json;

namespace CrepesCoffeeAdmin.Models
{
    public class LoginResponse
    {
        [JsonProperty("user")]
        public User? User { get; set; }

        [JsonProperty("token")]
        public string? Token { get; set; }
    }
}