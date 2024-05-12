variable "name" {
  type        = string
  description = "Resource group name"
  default     = "esease"
}

variable "environment" {
  type        = string
  description = "Deployment environment name"
  default     = "dev"
}

variable "location" {
  type        = string
  description = "Resource group location"
  default     = "East US"
}