resource "azurerm_container_registry" "default" {
  name                     = "${var.name}acr"
  resource_group_name      = azurerm_resource_group.default.name
  location                 = azurerm_resource_group.default.location
  sku                      = "Premium"
  admin_enabled            = true
  georeplication_locations = ["West US", "West Europe"]
}