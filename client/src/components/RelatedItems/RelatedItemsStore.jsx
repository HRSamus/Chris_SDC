import create from 'zustand';


export const useRelatedItemsStore = create(set => ({
  outfitList: {},
  relatedItemsList: [],
  setOutfit: (products) => {
    set({outfitList: products});
    var productsString = JSON.stringify(products);
    localStorage.setItem('outfitList', productsString);
  },
  getOutfitFromLocalStorage: () => {
    var products = JSON.parse(localStorage.getItem('outfitList')) || {};
    set({outfitList: products});
  },
  setRelatedItems: (relatedItems) => set({relatedItemsList: relatedItems})
}))
