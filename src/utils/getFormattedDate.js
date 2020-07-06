
const getFormattedDate = (rawDate) => {
  let date = new Date(rawDate);
  let months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];
  let dateDay = date.getUTCDate();
  let dateMonth = months[date.getUTCMonth()];
  let dateYear = date.getUTCFullYear();

  let dateString = `${dateDay} ${dateMonth} ${dateYear}`;

  return dateString;
};

export default getFormattedDate;
