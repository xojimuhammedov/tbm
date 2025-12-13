export const getSourceFromPath = (pathname: string): string | null => {
  const parts = pathname.split("/");
  return parts.length >= 3 ? parts[2] : null;
};
