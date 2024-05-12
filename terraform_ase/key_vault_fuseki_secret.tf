resource "azurerm_key_vault_secret" "fuseki_secret" {
  name         = "FUSEKISECRET"
  value        = random_password.fuseki_password.result
  key_vault_id = azurerm_key_vault.default.id
}