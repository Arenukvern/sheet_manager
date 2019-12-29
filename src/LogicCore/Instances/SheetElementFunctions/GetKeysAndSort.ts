export const getKeysAndSort = (
  oldMap: SheetElementsInterface.EMap
): SheetElementsInterface.EMap => {
  const tempMap: SheetElementsInterface.EMap = new Map();
  const keys: SheetElementsInterface.SheetElement["id"][] = Object.values(
    oldMap.keys()
  ).sort((a, b) => {
    return Number(a) - Number(b);
  });
  for (let key of keys) {
    const element: SheetElementsInterface.SheetElement | undefined = oldMap.get(
      key
    );
    if (element) {
      const elementMap = element.elements;
      element.elements = getKeysAndSort(elementMap);
      tempMap.set(key, element);
    }
  }
  return tempMap;
};
