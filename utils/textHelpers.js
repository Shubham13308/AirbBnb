export function isDescriptionLong(description, wordLimit = 100) {
  const words = description.trim().split(/\s+/); 
  return words.length > wordLimit;
}

export function getTrimmedDescription(description, wordLimit = 100) {
  const words = description.trim().split(/\s+/);
  return words.slice(0, wordLimit).join(' ') + '...';
}
