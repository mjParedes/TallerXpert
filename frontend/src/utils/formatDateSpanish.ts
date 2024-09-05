const days = [
  "Domingo", "Lunes", "Martes", "Miércoles",
  "Jueves", "Viernes", "Sábado"
];
const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo",
  "Junio", "Julio", "Agosto", "Septiembre",
  "Octubre", "Noviembre", "Diciembre"
];


export const getDateFormatSpanish = (date: Date): string => {
  const dayWeek = days[date.getDay()];
  const dayMonth = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayWeek} ${dayMonth} de ${month} de ${year}`;
}
