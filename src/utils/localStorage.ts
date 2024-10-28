// utils/localStorage.ts
interface FavoriteItem {
    itemId: number;
    isSaved: boolean;
  }
  
  export const getFavorites = (): FavoriteItem[] => {
    if (typeof window !== "undefined") {
      const storedItems = localStorage.getItem("favorites");
      return storedItems ? JSON.parse(storedItems) : [];
    }
    return [];
  };
  
  export const saveFavorite = (itemId: number): void => {
    const favorites = getFavorites();
    if (!favorites.some((item) => item.itemId === itemId)) {
      favorites.push({ itemId, isSaved: true });
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };
  
  export const removeFavorite = (itemId: number): void => {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter((item) => item.itemId !== itemId);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  
  export const isFavorite = (itemId: number): boolean => {
    const favorites = getFavorites();
    return favorites.some((item) => item.itemId === itemId);
  };
  