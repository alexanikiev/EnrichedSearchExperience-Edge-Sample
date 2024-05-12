resource "azurerm_key_vault_secret" "keyphraseextraction_secret" {
  name         = "KEYPHRASEEXTRACTIONSECRET"
  value        = azurerm_cognitive_account.keyphraseextraction.primary_access_key
  key_vault_id = azurerm_key_vault.default.id
}