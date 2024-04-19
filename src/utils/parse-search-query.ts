export const parseSearchQuery = (searchTerm: string) => {
  return searchTerm
    .replace(/[&\/\\#,+()$~%.|&'":*?<>{}]/g, "")
    .trim()
    .replace(/\s\s+/g, " ");
};
