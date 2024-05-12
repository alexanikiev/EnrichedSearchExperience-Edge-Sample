resource "azurerm_key_vault_secret" "sentimentanalysis_secret" {
  name         = "SENTIMENTANALYSISSECRET"
  value        = azurerm_cognitive_account.sentimentanalysis.primary_access_key
  key_vault_id = azurerm_key_vault.default.id
}