using System.Collections.Generic;
using Newtonsoft.Json;

namespace CrepesCoffeeAdmin.Models
{
    public class DashboardData
    {
        [JsonProperty("kpis")]
        public KPIs KPIs { get; set; } = new KPIs();

        [JsonProperty("productos_mas_vendidos")]
        public List<ProductoVendido> ProductosMasVendidos { get; set; } = new List<ProductoVendido>();

        [JsonProperty("ventas_por_mes")]
        public List<VentaPorMes> VentasPorMes { get; set; } = new List<VentaPorMes>();
    }

    public class KPIs
    {
        [JsonProperty("total_ventas")]
        public decimal TotalVentas { get; set; }

        [JsonProperty("total_pedidos")]
        public int TotalPedidos { get; set; }

        [JsonProperty("pedidos_pendientes")]
        public int PedidosPendientes { get; set; }

        [JsonProperty("pedidos_pagados")]
        public int PedidosPagados { get; set; }

        [JsonProperty("total_usuarios")]
        public int TotalUsuarios { get; set; }

        [JsonProperty("total_productos")]
        public int TotalProductos { get; set; }

        public string TotalVentasFormateado => $"${TotalVentas:F2}";
    }

    public class ProductoVendido
    {
        [JsonProperty("producto_id")]
        public int ProductoId { get; set; }

        [JsonProperty("nombre")]
        public string Nombre { get; set; } = string.Empty;

        [JsonProperty("cantidad_vendida")]
        public int CantidadVendida { get; set; }

        [JsonProperty("total_ventas")]
        public decimal TotalVentas { get; set; }

        public string TotalVentasFormateado => $"${TotalVentas:F2}";
    }

    public class VentaPorMes
    {
        [JsonProperty("mes")]
        public string Mes { get; set; } = string.Empty;

        [JsonProperty("total_ventas")]
        public decimal TotalVentas { get; set; }

        [JsonProperty("cantidad_pedidos")]
        public int CantidadPedidos { get; set; }

        public string TotalVentasFormateado => $"${TotalVentas:F2}";
    }
} 