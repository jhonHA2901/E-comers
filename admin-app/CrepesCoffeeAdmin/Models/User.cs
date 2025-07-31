using System;
using Newtonsoft.Json;

namespace CrepesCoffeeAdmin.Models
{
    public class User
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("nombre")]
        public string Nombre { get; set; } = string.Empty;

        [JsonProperty("email")]
        public string Email { get; set; } = string.Empty;

        [JsonProperty("direccion")]
        public string? Direccion { get; set; }

        [JsonProperty("telefono")]
        public string? Telefono { get; set; }

        [JsonProperty("rol")]
        public string Rol { get; set; } = string.Empty;

        [JsonProperty("created_at")]
        public DateTime CreatedAt { get; set; }

        [JsonProperty("updated_at")]
        public DateTime UpdatedAt { get; set; }

        public bool IsAdmin => Rol.ToLower() == "admin";
    }
} 