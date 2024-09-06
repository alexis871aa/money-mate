export const calculateTotal = (
  items: { amount: number | undefined }[],
): number => {
  return items.reduce((acc, item) => {
    const validAmount = typeof item.amount === "number" ? item.amount : 0;
    return acc + validAmount;
  }, 0);
};
