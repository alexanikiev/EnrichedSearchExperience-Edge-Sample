resource "azurerm_key_vault_secret" "languagedetection_secret" {
  name         = "LANGUAGEDETECTIONSECRET"
  value        = azurerm_cognitive_account.languagedetection.primary_access_key
  key_vault_id = azurerm_key_vault.default.id
}