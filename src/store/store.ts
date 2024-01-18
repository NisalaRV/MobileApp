import { create } from "zustand";
import { produce } from "immer";
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from "@react-native-async-storage/async-storage";
import BiriyaniData from "../data/BiriyaniData";
import DrinksData from "../data/DrinksData"

export const useStore = create(
    persist(
        (set, get) => ({
            BiriyaniList: BiriyaniData,
            DrinksList: DrinksData,
            CartPrice:0,
            FavoriteList: [],
            CartList: [],
            OrderHistoryList:[],
        }),
        {
            name: 'biriyani-app',
            storage:createJSONStorage(() => AsyncStorage),
        },
    ),
);