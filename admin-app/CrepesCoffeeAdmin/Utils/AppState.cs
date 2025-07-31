using System;
using CrepesCoffeeAdmin.Models;
using CrepesCoffeeAdmin.Services;

namespace CrepesCoffeeAdmin.Utils
{
    public static class AppState
    {
        public static ApiService ApiService { get; set; } = new ApiService();
        public static User? CurrentUser { get; set; }

        public static void SetAuthentication(User user, string token = null)
        {
            CurrentUser = user;
            // El token ya no se utiliza para la autenticación, pero se mantiene el método por compatibilidad
            // Las cookies de sesión se manejan automáticamente por HttpClient
            ApiService.SetAuthToken(token ?? string.Empty);
        }

        public static void ClearAuthentication()
        {
            CurrentUser = null;
            ApiService.ClearAuthToken();
        }

        public static bool IsAuthenticated => CurrentUser != null;
        public static bool IsAdmin => CurrentUser?.IsAdmin == true;
    }
}