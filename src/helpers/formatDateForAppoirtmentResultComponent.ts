export function formatDateForAppoirtmentResultComponent(datetime: string) {
  const date = new Date(datetime.replace(' ', 'T'));
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${
    hours < 12 ? 'AM' : 'PM'
  }`;

  return `${formattedDate}, \n at ${formattedTime}`;
}
