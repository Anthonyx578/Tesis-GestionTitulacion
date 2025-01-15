
export function ExeptValidator(e: any): string | null {
  // Validar que el error sea válido

  const message = e.message;
  if(!message.includes){
    return e
  }
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

  if (e.error) {
    const query = e.error.query || '';
    const driverError = e.error.driverError || {};
    const code = e.error.code || '';

    // Validar errores relacionados con consultas SQL
    if (query && code === '22P02') {
      return 'Error en la consulta: un parámetro tiene un formato incorrecto.';
    }

    if (driverError.name === 'error' && driverError.code) {
      return `Error del controlador de base de datos: ${driverError.code}`;
    }

    if (query) {
      return 'Ocurrió un error al realizar una operación en la base de datos.';
    }
  }

  // Mensaje genérico si no se encontró una coincidencia
  return 'Error en la operación';;
}