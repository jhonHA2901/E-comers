using System;
using CrepesCoffeeAdmin.Models;
using CrepesCoffeeAdmin.Services;

namespace CrepesCoffeeAdmin.Utils
{
    public static class AppState
    {
        public static ApiService ApiService { get; set; } = new ApiService();
        public static User? CurrentUser { get; set; }

        public static void SetAuthentication(User user, string token)
        {
            CurrentUser = user;
            ApiService.SetAuthToken(token);
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