resource "random_password" "functions_password" {
  length = 16
  special = true
  override_special = "_%@"
}