using System;
using System.Windows;
using CrepesCoffeeAdmin.Models;
using CrepesCoffeeAdmin.Services;
using CrepesCoffeeAdmin.Utils;

namespace CrepesCoffeeAdmin.Views
{
    public partial class LoginWindow : Window
    {
        private readonly ApiService _apiService;

        public LoginWindow()
        {
            InitializeComponent();
            _apiService = AppState.ApiService;
            
            // Set focus to email field
            txtEmail.Focus();
            
            // Handle Enter key
            txtPassword.KeyDown += (s, e) =>
            {
                if (e.Key == System.Windows.Input.Key.Enter)
                {
                    BtnLogin_Click(s, e);
                }
            };
        }

        private async void BtnLogin_Click(object sender, RoutedEventArgs e)
        {
            var email = txtEmail.Text.Trim();
            var password = txtPassword.Password;

            // Validation
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                ShowError("Por favor completa todos los campos");
                return;
            }

            if (!IsValidEmail(email))
            {
                ShowError("Por favor ingresa un email válido");
                return;
            }

            // Disable login button and show loading
            btnLogin.IsEnabled = false;
            btnLogin.Content = "Iniciando sesión...";
            txtError.Visibility = Visibility.Collapsed;

            try
            {
                var response = await _apiService.LoginAsync(email, password);
                
                if (response.Success && response.Data != null)
                {
                    var loginData = response.Data;
                    
                    // Check if user is admin
                    if (loginData.User?.IsAdmin == true)
                    {
                        // Set authentication
                        AppState.SetAuthentication(loginData.User, loginData.Token ?? string.Empty);
                        
                        // Show main window
                        var mainWindow = new MainWindow();
                        mainWindow.Show();
                        Close();
                    }
                    else
                    {
                        ShowError("Acceso denegado. Solo administradores pueden acceder al panel.");
                    }
                }
                else
                {
                    ShowError(response.Message ?? "Credenciales incorrectas");
                }
            }
            catch (Exception ex)
            {
                ShowError($"Error de conexión: {ex.Message}");
            }
            finally
            {
                // Re-enable login button
                btnLogin.IsEnabled = true;
                btnLogin.Content = "Iniciar Sesión";
            }
        }

        private void ShowError(string message)
        {
            txtError.Text = message;
            txtError.Visibility = Visibility.Visible;
        }

        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
    }
} 