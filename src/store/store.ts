import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BiriyaniData from '../data/BiriyaniData';
import DrinksData from '../data/DrinksData';

export const useStore = create(
  persist(
    (set, get) => ({
      BiriyaniList: BiriyaniData,
      DrinksList: DrinksData,
      CartPrice: 0,
      FavoriteList: [],
      CartList: [],
      OrderHistoryList: [],
      addToCart: (cartItem: any) =>
        set(
          produce(state => {
            let found = false;
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == cartItem.id) {
                found = true;
                let size = false;
                for (let j = 0; j < state.CartList[i].price.length; j++) {
                  if (
                    state.CartList[i].price[j].size == cartItem.prices[0].size
                  ) {
                    size = true;
                    state.CartList[i].price[j].quantity++;
                    break;
                  }
                }
                if (size == false) {
                  state.CartList[i].price.push(cartItem.price[0]);
                }
                state.CartList[i].price.sort((a: any, b: any) => {
                  if (a.size > b.size) {
                    return -1;
                  }
                  if (a.size < b.size) {
                    return 1;
                  }
                  return 0;
                });
                break;
              }
            }
            if (found == false) {
              state.CartList.push(cartItem);
            }
          }),
        ),
      calculateCartPrice: () =>
        set(
          produce(state => {
            let totalprice = 0;
            for (let i = 0; i < state.CartList.length; i++) {
              let tempprice = 0;
              for (let j = 0; j < state.CartList[i].price.length; j++) {
                tempprice =
                  tempprice +
                  parseFloat(state.CartList[i].price[j].price) *
                    state.CartList[i].price[j].quantity;
              }
              state.CartList[i].ItemPrice = tempprice.toFixed(2).toString();
              totalprice = totalprice + tempprice;
            }
            state.CartPrice = totalprice.toFixed(2).toString();
          }),
        ),
      addToFavoriteList: (type: string, id: string) =>
        set(
          produce(state => {
            if (type == 'Biriyani') {
              for (let i = 0; i < state.BiriyaniList.length; i++) {
                if (state.BiriyaniList[i].id == id) {
                  if (state.BiriyaniList[i].favourite == false) {
                    state.BiriyaniList[i].favourite = true;
                    state.FavoritesList.unshift(state.BiriyaniList[i]);
                  } else {
                    state.BiriyaniList[i].favourite = false;
                  }
                  break;
                }
              }
            } else if (type == 'Drinks') {
              for (let i = 0; i < state.DrinksList.length; i++) {
                if (state.DrinksList[i].id == id) {
                  if (state.DrinksList[i].favourite == false) {
                    state.DrinksList[i].favourite = true;
                    state.FavoritesList.unshift(state.DrinksList[i]);
                  } else {
                    state.DrinksList[i].favourite = false;
                  }
                  break;
                }
              }
            }
          }),
        ),
      deleteFromFavoriteList: (type: string, id: string) =>
        set(
          produce(state => {
            if (type == 'Biriyani') {
              for (let i = 0; i < state.BiriyaniList.length; i++) {
                if (state.BiriyaniList[i].id == id) {
                  if (state.BiriyaniList[i].favourite == true) {
                    state.BiriyaniList[i].favourite = false;
                  } else {
                    state.BiriyaniList[i].favourite = true;
                  }
                  break;
                }
              }
            } else if (type == 'Drinks') {
              for (let i = 0; i < state.DrinksList.length; i++) {
                if (state.DrinksList[i].id == id) {
                  if (state.DrinksList[i].favourite == true) {
                    state.DrinksList[i].favourite = false;
                  } else {
                    state.DrinksList[i].favourite = true;
                  }
                  break;
                }
              }
            }
            let spliceIndex = -1;
            for (let i = 0; i < state.FavoritesList.length; i++) {
              if (state.FavoritesList[i].id == id) {
                spliceIndex = i;
                break;
              }
            }
            state.FavoritesList.splice(spliceIndex, 1);
          }),
        ),
      incrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce(state => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == id) {
                for (let j = 0; j < state.CartList[i].price.length; j++) {
                  if (state.CartList[i].price[j].size == size) {
                    state.CartList[i].price[j].quantity++;
                    break;
                  }
                }
              }
            }
          }),
        ),
      decrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce(state => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == id) {
                for (let j = 0; j < state.CartList[i].price.length; j++) {
                  if (state.CartList[i].price[j].size == size) {
                    if (state.CartList[i].price.length > 1) {
                      if (state.CartList[i].price[j].quantity > 1) {
                        state.CartList[i].price[j].quantity--;
                      } else {
                        state.CartList[i].price.splice(j, 1);
                      }
                    } else {
                      if (state.CartList[i].price[j].quantity > 1) {
                        state.CartList[i].price[j].quantity--;
                      } else {
                        state.CartList.splice(i, 1);
                      }
                    }
                    break;
                  }
                }
              }
            }
          }),
        ),
      addToOrderHistoryListFromCart: () =>
        set(
          produce(state => {
            let temp = state.CartList.reduce(
              (accumulator: number, currentValue: any) =>
                accumulator + parseFloat(currentValue.ItemPrice),
              0,
            );
            if (state.OrderHistoryList.length > 0) {
              state.OrderHistoryList.unshift({
                OrderDate:
                  new Date().toDateString() +
                  ' ' +
                  new Date().toLocaleTimeString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(2).toString(),
              });
            } else {
              state.OrderHistoryList.push({
                OrderDate:
                  new Date().toDateString() +
                  ' ' +
                  new Date().toLocaleTimeString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(2).toString(),
              });
            }
            state.CartList = [];
          }),
        ),
    }),
    {
      name: 'biriyani-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
