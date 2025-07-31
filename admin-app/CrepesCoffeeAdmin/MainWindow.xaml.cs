using System;
using System.Windows;
using System.Windows.Controls;
using CrepesCoffeeAdmin.Views;
using CrepesCoffeeAdmin.Utils;

namespace CrepesCoffeeAdmin
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            InitializeApp();
        }

        private void InitializeApp()
        {
            // Set initial user name (this would come from login)
            txtUserName.Text = "Administrador";
            
            // Load dashboard by default
            LoadDashboardData();
            ShowDashboard();
        }

        private async void LoadDashboardData()
        {
            try
            {
                var response = await AppState.ApiService.GetDashboardDataAsync();
                if (response.Success && response.Data != null)
                {
                    var data = response.Data;
                    
                    // Update KPIs
                    txtTotalSales.Text = data.KPIs.TotalVentasFormateado;
                    txtTotalOrders.Text = data.KPIs.TotalPedidos.ToString();
                    txtPendingOrders.Text = data.KPIs.PedidosPendientes.ToString();
                    txtTotalUsers.Text = data.KPIs.TotalUsuarios.ToString();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error al cargar datos del dashboard: {ex.Message}", "Error", 
                    MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void ShowDashboard()
        {
            dashboardContent.Visibility = Visibility.Visible;
            productsContent.Visibility = Visibility.Collapsed;
            categoriesContent.Visibility = Visibility.Collapsed;
            ordersContent.Visibility = Visibility.Collapsed;
            usersContent.Visibility = Visibility.Collapsed;
        }

        private void ShowProducts()
        {
            dashboardContent.Visibility = Visibility.Collapsed;
            productsContent.Visibility = Visibility.Visible;
            categoriesContent.Visibility = Visibility.Collapsed;
            ordersContent.Visibility = Visibility.Collapsed;
            usersContent.Visibility = Visibility.Collapsed;
        }

        private void ShowOrders()
        {
            dashboardContent.Visibility = Visibility.Collapsed;
            productsContent.Visibility = Visibility.Collapsed;
            categoriesContent.Visibility = Visibility.Collapsed;
            ordersContent.Visibility = Visibility.Visible;
            usersContent.Visibility = Visibility.Collapsed;
        }

        private void ShowCategories()
        {
            // TODO: Implement CategoriesView
            MessageBox.Show("Gestión de categorías próximamente", "Información", 
                MessageBoxButton.OK, MessageBoxImage.Information);
        }

        private void ShowUsers()
        {
            // TODO: Implement UsersView
            MessageBox.Show("Gestión de usuarios próximamente", "Información", 
                MessageBoxButton.OK, MessageBoxImage.Information);
        }

        private void Logout()
        {
            var result = MessageBox.Show("¿Estás seguro de que quieres cerrar sesión?", 
                "Confirmar Cierre de Sesión", MessageBoxButton.YesNo, MessageBoxImage.Question);
            
            if (result == MessageBoxResult.Yes)
            {
                AppState.ClearAuthentication();
                
                // Show login window
                var loginWindow = new LoginWindow();
                loginWindow.Show();
                Close();
            }
        }

        // Event handlers for navigation buttons
        private void BtnDashboard_Click(object sender, RoutedEventArgs e)
        {
            ShowDashboard();
        }

        private void BtnProducts_Click(object sender, RoutedEventArgs e)
        {
            ShowProducts();
        }

        private void BtnOrders_Click(object sender, RoutedEventArgs e)
        {
            ShowOrders();
        }

        private void BtnCategories_Click(object sender, RoutedEventArgs e)
        {
            ShowCategories();
        }

        private void BtnUsers_Click(object sender, RoutedEventArgs e)
        {
            ShowUsers();
        }

        private void BtnLogout_Click(object sender, RoutedEventArgs e)
        {
            Logout();
        }
    }
}