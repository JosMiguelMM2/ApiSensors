function fechaAString() {
  const fecha = new Date();
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Ajustar el mes para que tenga dos dígitos
  const day = String(fecha.getDate()).padStart(2, '0'); // Ajustar el día para que tenga dos dígitos
  const hours = String(fecha.getHours()).padStart(2, '0'); // Ajustar las horas para que tengan dos dígitos
  const minutes = String(fecha.getMinutes()).padStart(2, '0'); // Ajustar los minutos para que tengan dos dígitos
  const seconds = String(fecha.getSeconds()).padStart(2, '0'); // Ajustar los segundos para que tengan dos dígitos

  // Formatear la fecha como una cadena
  let formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

function fechaStringString(fechaOriginal: string) {
  // Crear un objeto de fecha a partir de la cadena
  const fecha = new Date(fechaOriginal);

  // Obtener los componentes de la fecha
  const año = fecha.getFullYear();
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 al mes ya que en JavaScript los meses van de 0 a 11
  const dia = fecha.getDate().toString().padStart(2, '0');

  // Crear la cadena en el formato deseado
  const fechaFormateada = `${año}${mes}${dia}`;
  return fechaFormateada;
}

export { fechaAString,fechaStringString };
