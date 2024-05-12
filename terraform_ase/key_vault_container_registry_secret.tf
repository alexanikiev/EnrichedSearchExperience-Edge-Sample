resource "azurerm_key_vault_secret" "container_registry_secret" {
  name         = "CONTAINERREGISTRYSECRET"
  value        = azurerm_container_registry.default.admin_password
  key_vault_id = azurerm_key_vault.default.id
}