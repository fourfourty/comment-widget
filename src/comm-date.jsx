
const Comm_date = () => {
  const date = new Date();
  const dateCustom = date.toLocaleString('ru-RU', {
		year: 'numeric',
    month: 'long',
		day: 'numeric',
    date: 'numeric',
	});
  const CURRENT_DATE = `Опубликовано ${dateCustom} в ${date.getHours()} час. ${date.getMinutes()} мин.`;
  return CURRENT_DATE;
}

export default Comm_date;