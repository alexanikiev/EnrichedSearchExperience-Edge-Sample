resource "random_password" "sql_password" {
  length = 16
  special = true
  override_special = "_%@"
}