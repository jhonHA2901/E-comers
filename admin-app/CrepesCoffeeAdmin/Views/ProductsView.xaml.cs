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
    public partial class ProductsView : UserControl
    {
        private readonly ApiService _apiService;
        private List<Producto> _allProducts;
        private List<Categoria> _categories;

        public ProductsView()
        {
            InitializeComponent();
            _apiService = AppState.ApiService;
            _allProducts = new List<Producto>();
            _categories = new List<Categoria>();
            
            LoadData();
            SetupEventHandlers();
        }

        private void SetupEventHandlers()
        {
            btnAddProduct.Click += BtnAddProduct_Click;
            btnRefresh.Click += BtnRefresh_Click;
            txtSearch.TextChanged += TxtSearch_TextChanged;
            cmbCategoryFilter.SelectionChanged += CmbCategoryFilter_SelectionChanged;
        }

        private async void LoadData()
        {
            try
            {
                // Load categories
                var categoriesResponse = await _apiService.GetCategoriasAsync();
                if (categoriesResponse.Success)
                {
                    _categories = categoriesResponse.Data;
                    cmbCategoryFilter.ItemsSource = _categories;
                }

                // Load products
                var productsResponse = await _apiService.GetProductosAsync();
                if (productsResponse.Success)
                {
                    _allProducts = productsResponse.Data;
                    ApplyFilters();
                }
                else
                {
                    MessageBox.Show($"Error al cargar productos: {productsResponse.Message}", "Error", 
                        MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error de conexión: {ex.Message}", "Error", 
                    MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void ApplyFilters()
        {
            var filteredProducts = _allProducts.AsEnumerable();

            // Search filter
            if (!string.IsNullOrWhiteSpace(txtSearch.Text))
            {
                var searchTerm = txtSearch.Text.ToLower();
                filteredProducts = filteredProducts.Where(p => 
                    p.Nombre.ToLower().Contains(searchTerm) || 
                    p.Descripcion?.ToLower().Contains(searchTerm) == true);
            }

            // Category filter
            if (cmbCategoryFilter.SelectedItem is Categoria selectedCategory)
            {
                filteredProducts = filteredProducts.Where(p => p.CategoriaId == selectedCategory.Id);
            }

            dgProducts.ItemsSource = filteredProducts.ToList();
        }

        private void TxtSearch_TextChanged(object sender, TextChangedEventArgs e)
        {
            ApplyFilters();
        }

        private void CmbCategoryFilter_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            ApplyFilters();
        }

        private void BtnRefresh_Click(object sender, RoutedEventArgs e)
        {
            LoadData();
        }

        private void BtnAddProduct_Click(object sender, RoutedEventArgs e)
        {
            // TODO: Open product form dialog
            MessageBox.Show("Funcionalidad de agregar producto próximamente", "Información", 
                MessageBoxButton.OK, MessageBoxImage.Information);
        }

        private void BtnEdit_Click(object sender, RoutedEventArgs e)
        {
            if (sender is Button button && button.DataContext is Producto producto)
            {
                // TODO: Open product edit form dialog
                MessageBox.Show($"Editar producto: {producto.Nombre}", "Información", 
                    MessageBoxButton.OK, MessageBoxImage.Information);
            }
        }

        private async void BtnDelete_Click(object sender, RoutedEventArgs e)
        {
            if (sender is Button button && button.DataContext is Producto producto)
            {
                var result = MessageBox.Show($"¿Estás seguro de que quieres eliminar el producto '{producto.Nombre}'?", 
                    "Confirmar Eliminación", MessageBoxButton.YesNo, MessageBoxImage.Question);

                if (result == MessageBoxResult.Yes)
                {
                    try
                    {
                        var response = await _apiService.DeleteProductoAsync(producto.Id);
                        if (response.Success)
                        {
                            MessageBox.Show("Producto eliminado exitosamente", "Éxito", 
                                MessageBoxButton.OK, MessageBoxImage.Information);
                            LoadData();
                        }
                        else
                        {
                            MessageBox.Show($"Error al eliminar producto: {response.Message}", "Error", 
                                MessageBoxButton.OK, MessageBoxImage.Error);
                        }
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show($"Error de conexión: {ex.Message}", "Error", 
                            MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
            }
        }

        private void DgProducts_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            // Handle selection change if needed
        }
    }
} 