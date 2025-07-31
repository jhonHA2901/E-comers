using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using CrepesCoffeeAdmin.Models;

namespace CrepesCoffeeAdmin.Services
{
    public class ApiService
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseUrl;
        private string? _authToken;

        public ApiService()
        {
            _httpClient = new HttpClient();
            _baseUrl = "http://127.0.0.1:8001/api";
            _httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
        }

        public void SetAuthToken(string token)
        {
            _authToken = token;
            if (!string.IsNullOrEmpty(token))
            {
                _httpClient.DefaultRequestHeaders.Remove("Authorization");
                _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
            }
        }

        public void ClearAuthToken()
        {
            _authToken = null;
            _httpClient.DefaultRequestHeaders.Remove("Authorization");
        }

        // Autenticación
        public async Task<ApiResponse<LoginResponse>> LoginAsync(string email, string password)
        {
            var loginData = new { email, password };
            var json = JsonConvert.SerializeObject(loginData);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync($"{_baseUrl}/login", content);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var result = JsonConvert.DeserializeObject<ApiResponse<LoginResponse>>(responseContent);
                if (result.Success && result.Data?.Token != null)
                {
                    SetAuthToken(result.Data.Token);
                }
                return result;
            }

            return new ApiResponse<LoginResponse>
            {
                Success = false,
                Message = "Error de conexión con el servidor"
            };
        }

        public async Task<ApiResponse<object>> LogoutAsync()
        {
            var response = await _httpClient.PostAsync($"{_baseUrl}/logout", null);
            ClearAuthToken();
            
            return new ApiResponse<object>
            {
                Success = response.IsSuccessStatusCode,
                Message = response.IsSuccessStatusCode ? "Logout exitoso" : "Error en logout"
            };
        }

        // Dashboard
        public async Task<ApiResponse<DashboardData>> GetDashboardDataAsync()
        {
            var response = await _httpClient.GetAsync($"{_baseUrl}/admin/dashboard");
            var content = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<ApiResponse<DashboardData>>(content);
            }

            return new ApiResponse<DashboardData>
            {
                Success = false,
                Message = "Error al obtener datos del dashboard"
            };
        }

        // Productos
        public async Task<PaginatedResponse<Producto>> GetProductosAsync(int page = 1, int? categoriaId = null)
        {
            var url = $"{_baseUrl}/productos?page={page}";
            if (categoriaId.HasValue)
                url += $"&categoria_id={categoriaId}";

            var response = await _httpClient.GetAsync(url);
            var content = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<PaginatedResponse<Producto>>(content);
            }

            return new PaginatedResponse<Producto>
            {
                Success = false,
                Message = "Error al obtener productos"
            };
        }

        public async Task<ApiResponse<Producto>> GetProductoAsync(int id)
        {
            var response = await _httpClient.GetAsync($"{_baseUrl}/productos/{id}");
            var content = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<ApiResponse<Producto>>(content);
            }

            return new ApiResponse<Producto>
            {
                Success = false,
                Message = "Error al obtener el producto"
            };
        }

        public async Task<ApiResponse<Producto>> CreateProductoAsync(Producto producto)
        {
            var json = JsonConvert.SerializeObject(producto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync($"{_baseUrl}/productos", content);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<ApiResponse<Producto>>(responseContent);
            }

            return new ApiResponse<Producto>
            {
                Success = false,
                Message = "Error al crear el producto"
            };
        }

        public async Task<ApiResponse<Producto>> UpdateProductoAsync(int id, Producto producto)
        {
            var json = JsonConvert.SerializeObject(producto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PutAsync($"{_baseUrl}/productos/{id}", content);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<ApiResponse<Producto>>(responseContent);
            }

            return new ApiResponse<Producto>
            {
                Success = false,
                Message = "Error al actualizar el producto"
            };
        }

        public async Task<ApiResponse<object>> DeleteProductoAsync(int id)
        {
            var response = await _httpClient.DeleteAsync($"{_baseUrl}/productos/{id}");
            var content = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<ApiResponse<object>>(content);
            }

            return new ApiResponse<object>
            {
                Success = false,
                Message = "Error al eliminar el producto"
            };
        }

        // Categorías
        public async Task<ApiResponse<List<Categoria>>> GetCategoriasAsync()
        {
            var response = await _httpClient.GetAsync($"{_baseUrl}/categorias");
            var content = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<ApiResponse<List<Categoria>>>(content);
            }

            return new ApiResponse<List<Categoria>>
            {
                Success = false,
                Message = "Error al obtener categorías"
            };
        }

        public async Task<ApiResponse<Categoria>> CreateCategoriaAsync(Categoria categoria)
        {
            var json = JsonConvert.SerializeObject(categoria);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync($"{_baseUrl}/categorias", content);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<ApiResponse<Categoria>>(responseContent);
            }

            return new ApiResponse<Categoria>
            {
                Success = false,
                Message = "Error al crear la categoría"
            };
        }

        public async Task<ApiResponse<Categoria>> UpdateCategoriaAsync(int id, Categoria categoria)
        {
            var json = JsonConvert.SerializeObject(categoria);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PutAsync($"{_baseUrl}/categorias/{id}", content);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<ApiResponse<Categoria>>(responseContent);
            }

            return new ApiResponse<Categoria>
            {
                Success = false,
                Message = "Error al actualizar la categoría"
            };
        }

        public async Task<ApiResponse<object>> DeleteCategoriaAsync(int id)
        {
            var response = await _httpClient.DeleteAsync($"{_baseUrl}/categorias/{id}");
            var content = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<ApiResponse<object>>(content);
            }

            return new ApiResponse<object>
            {
                Success = false,
                Message = "Error al eliminar la categoría"
            };
        }

        // Pedidos
        public async Task<PaginatedResponse<Pedido>> GetPedidosAsync(int page = 1)
        {
            var response = await _httpClient.GetAsync($"{_baseUrl}/admin/pedidos?page={page}");
            var content = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<PaginatedResponse<Pedido>>(content);
            }

            return new PaginatedResponse<Pedido>
            {
                Success = false,
                Message = "Error al obtener pedidos"
            };
        }

        public async Task<ApiResponse<Pedido>> GetPedidoAsync(int id)
        {
            var response = await _httpClient.GetAsync($"{_baseUrl}/admin/pedidos/{id}");
            var content = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<ApiResponse<Pedido>>(content);
            }

            return new ApiResponse<Pedido>
            {
                Success = false,
                Message = "Error al obtener el pedido"
            };
        }

        public async Task<ApiResponse<Pedido>> UpdatePedidoStatusAsync(int id, string estado)
        {
            var updateData = new { estado };
            var json = JsonConvert.SerializeObject(updateData);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PutAsync($"{_baseUrl}/admin/pedidos/{id}/status", content);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<ApiResponse<Pedido>>(responseContent);
            }

            return new ApiResponse<Pedido>
            {
                Success = false,
                Message = "Error al actualizar el estado del pedido"
            };
        }

        // Usuarios
        public async Task<PaginatedResponse<User>> GetUsersAsync(int page = 1)
        {
            var response = await _httpClient.GetAsync($"{_baseUrl}/admin/users?page={page}");
            var content = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<PaginatedResponse<User>>(content);
            }

            return new PaginatedResponse<User>
            {
                Success = false,
                Message = "Error al obtener usuarios"
            };
        }

        public async Task<ApiResponse<object>> DeleteUserAsync(int id)
        {
            var response = await _httpClient.DeleteAsync($"{_baseUrl}/admin/users/{id}");
            var content = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<ApiResponse<object>>(content);
            }

            return new ApiResponse<object>
            {
                Success = false,
                Message = "Error al eliminar el usuario"
            };
        }
    }

    public class LoginResponse
    {
        [JsonProperty("user")]
        public User? User { get; set; }

        [JsonProperty("token")]
        public string? Token { get; set; }

        [JsonProperty("token_type")]
        public string? TokenType { get; set; }
    }
} 