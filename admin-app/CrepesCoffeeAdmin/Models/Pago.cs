using System;
using Newtonsoft.Json;

namespace CrepesCoffeeAdmin.Models
{
    public class Pago
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("pedido_id")]
        public int PedidoId { get; set; }

        [JsonProperty("monto")]
        public decimal Monto { get; set; }

        [JsonProperty("estado_pago")]
        public string EstadoPago { get; set; } = string.Empty;

        [JsonProperty("fecha_pago")]
        public DateTime? FechaPago { get; set; }

        [JsonProperty("created_at")]
        public DateTime CreatedAt { get; set; }

        [JsonProperty("updated_at")]
        public DateTime UpdatedAt { get; set; }

        public string MontoFormateado => $"${Monto:F2}";
        public string EstadoFormateado => EstadoPago.ToUpper();
    }
} 