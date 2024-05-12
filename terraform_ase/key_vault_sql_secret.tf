resource "azurerm_key_vault_secret" "sql_secret" {
  name         = "SQLSECRET"
  value        = random_password.sql_password.result
  key_vault_id = azurerm_key_vault.default.id
}