using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using CrepesCoffeeAdmin.Models;
using CrepesCoffeeAdmin.Services;
using CrepesCoffeeAdmin.Utils;

namespace CrepesCoffeeAdmin.Views
{
    public partial class OrdersView : UserControl
    {
        private readonly ApiService _apiService;
        private List<Pedido> _allOrders;

        public OrdersView()
        {
            InitializeComponent();
            _apiService = AppState.ApiService;
            _allOrders = new List<Pedido>();
            
            LoadData();
            SetupEventHandlers();
        }

        private void SetupEventHandlers()
        {
            btnRefresh.Click += BtnRefresh_Click;
            txtSearch.TextChanged += TxtSearch_TextChanged;
            cmbStatusFilter.SelectionChanged += CmbStatusFilter_SelectionChanged;
            btnViewDetails.Click += BtnViewDetails_Click;
        }

        private async void LoadData()
        {
            try
            {
                // TODO: Implement API call to get orders
                // For now, using sample data
                _allOrders = new List<Pedido>();
                
                ApplyFilters();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error al cargar pedidos: {ex.Message}", "Error", 
                    MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void ApplyFilters()
        {
            var filteredOrders = _allOrders;
            
            // Apply search filter if text is provided
            if (!string.IsNullOrWhiteSpace(txtSearch.Text))
            {
                string searchTerm = txtSearch.Text.ToLower();
                filteredOrders = filteredOrders.Where(p => 
                    p.Usuario?.Nombre?.ToLower().Contains(searchTerm) == true ||
                    p.Id.ToString().Contains(searchTerm)
                ).ToList();
            }
            
            // Apply status filter if selected
            if (cmbStatusFilter.SelectedIndex > 0)
            {
                string statusFilter = ((ComboBoxItem)cmbStatusFilter.SelectedItem).Content.ToString();
                filteredOrders = filteredOrders.Where(p => p.EstadoFormateado == statusFilter).ToList();
            }
            
            // Update the DataGrid
            dgOrders.ItemsSource = filteredOrders;
            
            // Disable view details button if no orders are selected
            btnViewDetails.IsEnabled = dgOrders.SelectedItem != null;
        }

        private void TxtSearch_TextChanged(object sender, TextChangedEventArgs e)
        {
            ApplyFilters();
        }

        private void CmbStatusFilter_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            ApplyFilters();
        }

        private void BtnRefresh_Click(object sender, RoutedEventArgs e)
        {
            LoadData();
        }

        private void DgOrders_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            // Enable or disable the view details button based on selection
            btnViewDetails.IsEnabled = dgOrders.SelectedItem != null;
        }

        private void BtnViewDetails_Click(object sender, RoutedEventArgs e)
        {
            var selectedOrder = dgOrders.SelectedItem as Pedido;
            if (selectedOrder != null)
            {
                // TODO: Implement order details view
                MessageBox.Show($"Detalles del pedido {selectedOrder.Id}", "Información", 
                    MessageBoxButton.OK, MessageBoxImage.Information);
            }
        }

        private void BtnChangeStatus_Click(object sender, RoutedEventArgs e)
        {
            var button = sender as Button;
            var order = button?.DataContext as Pedido;
            
            if (order != null)
            {
                // TODO: Implement status change functionality
                MessageBox.Show($"Cambiar estado del pedido {order.Id}", "Información", 
                    MessageBoxButton.OK, MessageBoxImage.Information);
            }
        }
    }
}