output "resource_group_name" {
  value       = azurerm_resource_group.rg.name
  description = "Nombre del Resource Group"
}

output "acr_name" {
  value       = azurerm_container_registry.acr.name
  description = "Nombre del Azure Container Registry"
}

output "acr_login_server" {
  value       = azurerm_container_registry.acr.login_server
  description = "Servidor de login para el Azure Container Registry"
}

output "aci_ip_address" {
  value       = azurerm_container_group.aci.ip_address
  description = "Dirección IP privada de la instancia de contenedor (ACI)"
}
