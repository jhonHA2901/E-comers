using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace CrepesCoffeeAdmin.Models
{
    public class Pedido
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("usuario_id")]
        public int UsuarioId { get; set; }

        [JsonProperty("usuario")]
        public User? Usuario { get; set; }

        [JsonProperty("total")]
        public decimal Total { get; set; }

        [JsonProperty("estado")]
        public string Estado { get; set; } = string.Empty;

        [JsonProperty("direccion")]
        public string Direccion { get; set; } = string.Empty;

        [JsonProperty("telefono")]
        public string Telefono { get; set; } = string.Empty;

        [JsonProperty("notas")]
        public string? Notas { get; set; }

        [JsonProperty("detalles")]
        public List<PedidoDetalle>? Detalles { get; set; }

        [JsonProperty("created_at")]
        public DateTime CreatedAt { get; set; }

        [JsonProperty("updated_at")]
        public DateTime UpdatedAt { get; set; }

        public string TotalFormateado => $"${Total:F2}";
        public string FechaFormateada => CreatedAt.ToString("dd/MM/yyyy HH:mm");
        public string EstadoFormateado => Estado.ToUpper();
    }
} 