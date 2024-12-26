
export function ExeptValidator(e: any): string | null {
  // Validar que el error sea válido
  if (!e || !e.message) {
    return 'Error desconocido: el error no contiene un mensaje válido.';
  }

  const message = e.message.toLowerCase();

  // Validar errores de microservicios
  if (message.includes('empty response') || message.includes('no subscribers')) {
    return 'No se pudo establecer conexión con el microservicio solicitado.';
  }

  // Validar errores de base de datos
  if (message.includes('query') || message.includes('driver error')) {
    return 'Ocurrió un error al realizar una operación en la base de datos.';
  }

  // Otros casos de error
  if (message.includes('timeout')) {
    return 'La operación excedió el tiempo de espera permitido.';
  }

  // Agregar más validaciones si es necesario
  return 'Error en la operacion';
}