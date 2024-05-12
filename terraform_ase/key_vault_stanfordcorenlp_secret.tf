resource "azurerm_key_vault_secret" "stanfordcorenlp_secret" {
  name         = "STANFORDCORENLPSECRET"
  value        = random_password.stanfordcorenlp_password.result
  key_vault_id = azurerm_key_vault.default.id
}