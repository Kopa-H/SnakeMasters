function getFormattedDate() {
  // Se crea la fecha del día de hoy
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
  const year = today.getFullYear();

  const achievementDate = `${day}/${month}/${year}`;

  return achievementDate;
}

export default getFormattedDate;
