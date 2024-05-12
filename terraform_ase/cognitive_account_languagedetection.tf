resource "azurerm_cognitive_account" "languagedetection" {
  name                = "${var.name}languagedetection"
  location            = azurerm_resource_group.default.location
  resource_group_name = azurerm_resource_group.default.name
  kind                = "TextAnalytics"

  sku_name = "S0"
}