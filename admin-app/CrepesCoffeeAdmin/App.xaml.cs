using System.Windows;

namespace CrepesCoffeeAdmin
{
    public partial class App : Application
    {
        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);
            
            // Configure global exception handling
            Current.DispatcherUnhandledException += (sender, args) =>
            {
                MessageBox.Show($"Error inesperado: {args.Exception.Message}", "Error", 
                    MessageBoxButton.OK, MessageBoxImage.Error);
                args.Handled = true;
            };
        }
    }
}

