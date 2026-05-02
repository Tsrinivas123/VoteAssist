export const validateEpicFormat = (epic) => {
  if (!epic) return false;
  const epicRegex = /^[A-Z]{3}[0-9]{7}$/;
  return epicRegex.test(epic);
};
