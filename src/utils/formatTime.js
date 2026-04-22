export function formatTime(date) {
  const diffInSeconds = Math.floor((new Date() - new Date(date)) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} detik lalu`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} menit lalu`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} jam lalu`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} hari lalu`;
}
