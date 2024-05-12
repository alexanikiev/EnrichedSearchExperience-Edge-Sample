resource "random_password" "stanfordcorenlp_password" {
  length = 16
  special = true
  override_special = "_%@"
}