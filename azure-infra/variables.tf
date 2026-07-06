variable "resource_group_name" {
  type        = string
  default     = "rg-todo-app"
  description = "Nombre del grupo de recursos en Azure"
}

variable "location" {
  type        = string
  default     = "eastus"
  description = "Región de Azure donde se crearán los recursos"
}

variable "vnet_name" {
  type        = string
  default     = "vnet-todo-app"
  description = "Nombre de la Red Virtual (VNet)"
}

variable "vnet_address_space" {
  type        = list(string)
  default     = ["10.0.0.0/16"]
  description = "Espacio de direcciones de la VNet"
}

variable "subnet_name" {
  type        = string
  default     = "subnet-aci"
  description = "Nombre de la Subred delegada para ACI"
}

variable "subnet_address_prefix" {
  type        = list(string)
  default     = ["10.0.1.0/24"]
  description = "Prefijo de direcciones de la subred para ACI"
}

variable "acr_name" {
  type        = string
  default     = "acrtodoapp"
  description = "Nombre del Azure Container Registry (debe ser alfanumérico y globalmente único)"
}

variable "container_group_name" {
  type        = string
  default     = "aci-todo-app"
  description = "Nombre de la instancia de contenedor (ACI)"
}

variable "image_tag" {
  type        = string
  default     = "latest"
  description = "Tag de la imagen de Docker a desplegar"
}
