using System;
using Newtonsoft.Json;

namespace CrepesCoffeeAdmin.Models
{
    public class PedidoDetalle
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("pedido_id")]
        public int PedidoId { get; set; }

        [JsonProperty("producto_id")]
        public int ProductoId { get; set; }

        [JsonProperty("producto")]
        public Producto? Producto { get; set; }

        [JsonProperty("cantidad")]
        public int Cantidad { get; set; }

        [JsonProperty("precio_unitario")]
        public decimal PrecioUnitario { get; set; }

        [JsonProperty("created_at")]
        public DateTime CreatedAt { get; set; }

        [JsonProperty("updated_at")]
        public DateTime UpdatedAt { get; set; }

        public decimal Subtotal => Cantidad * PrecioUnitario;
        public string SubtotalFormateado => $"${Subtotal:F2}";
    }
} 