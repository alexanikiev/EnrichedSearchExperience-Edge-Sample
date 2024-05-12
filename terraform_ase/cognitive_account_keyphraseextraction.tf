resource "azurerm_cognitive_account" "keyphraseextraction" {
  name                = "${var.name}keyphraseextraction"
  location            = azurerm_resource_group.default.location
  resource_group_name = azurerm_resource_group.default.name
  kind                = "TextAnalytics"

  sku_name = "S0"
}