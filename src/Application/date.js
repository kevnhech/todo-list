function dateFormatter(dueDate) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const date = new Date();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const today = `${date.getFullYear()}-${month}-${day}`;

  const newFormat = `${months[+dueDate.slice(5, 7) - 1]} ` + `${dueDate.slice(8)}`;
  return { newFormat, today };
}

export { dateFormatter };