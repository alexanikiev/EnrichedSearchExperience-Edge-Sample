resource "azurerm_key_vault_secret" "functions_secret" {
  name         = "FUNCTIONSSECRET"
  value        = random_password.functions_password.result
  key_vault_id = azurerm_key_vault.default.id
}