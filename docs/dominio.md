# Nuestro negocio
Negocio: Manabí Catering & Banquetes
Descripción: Catálogo de menús para eventos (platos fuertes, entradas y bocaditos) con filtros por tipo de evento y cantidad de invitados. Incluye cálculo de insumos y gestión de personal (chefs/meseros).

## Las dos entidades principales
1. Cliente
2. Evento / Cotización, que se relaciona con la primera porque un cliente puede solicitar uno o varios eventos a lo largo del tiempo.

## La entidad que cambia de estado
Entidad: Evento / Cotización
Estados en orden: 
Cotización Registrada -> Insumos Comprados -> En Cocina -> En Servicio (Evento) -> Finalizado

## Los dos roles y permisos
- Cliente : puede explorar el catálogo de menús, filtrar por tipo de evento y cantidad de invitados, y registrar una nueva cotización.
- Administrador : puede revisar las cotizaciones, gestionar el cálculo de insumos según los invitados, verificar la disponibilidad de chefs/meseros, controlar la cadena de temperatura y avanzar el estado del evento.

## La pantalla de hoy
El rol que la usa: Administrador
La pregunta que responde: ¿Qué eventos o cotizaciones están activas, cuántos invitados asisten y en qué estado logístico se encuentran para procesarlos a tiempo?

## Pendientes
- Ajustar los detalles de la cadena de temperatura en el módulo logístico.