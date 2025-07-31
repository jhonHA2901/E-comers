using System;
using Newtonsoft.Json;

namespace CrepesCoffeeAdmin.Models
{
    public class Producto
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("nombre")]
        public string Nombre { get; set; } = string.Empty;

        [JsonProperty("descripcion")]
        public string? Descripcion { get; set; }

        [JsonProperty("precio")]
        public decimal Precio { get; set; }

        [JsonProperty("stock")]
        public int Stock { get; set; }

        [JsonProperty("imagen")]
        public string? Imagen { get; set; }

        [JsonProperty("categoria_id")]
        public int CategoriaId { get; set; }

        [JsonProperty("categoria")]
        public Categoria? Categoria { get; set; }

        [JsonProperty("created_at")]
        public DateTime CreatedAt { get; set; }

        [JsonProperty("updated_at")]
        public DateTime UpdatedAt { get; set; }

        public string PrecioFormateado => $"${Precio:F2}";
        public string StockStatus => Stock > 0 ? $"En Stock ({Stock})" : "Sin Stock";
    }
} 