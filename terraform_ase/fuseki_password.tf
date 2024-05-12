resource "random_password" "fuseki_password" {
  length = 16
  special = true
  override_special = "_%@"
}