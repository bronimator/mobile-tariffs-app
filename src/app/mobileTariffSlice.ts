import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import facebook_off from '../images/facebook_off.svg';
import facebook from '../images/facebook.svg';
import instagram_off from '../images/instagram_off.svg';
import instagram from '../images/instagram.svg';
import ok from '../images/ok.svg';
import ok_off from '../images/ok_off.svg';
import tiktok_off from '../images/tiktok_off.svg';
import tiktok from '../images/tiktok.svg';
import vk_off from '../images/vk_off.svg';
import vk from '../images/vk.svg';
import { SocialType } from '../lib/enums';

export interface TariffState {
    phone?: string | null;
    operator?: string | null;
    minutes?: number;
    internet?: number;
    rentRouter?: boolean;
    buyRouter?: boolean;
    socials?: Social[];
}

export interface Social {
    type: SocialType,
    img: string,
    img_off: string,
    price: number,
    key: number,
    selected: boolean | undefined,
}

const socials = [
    {
        type: SocialType.FACEBOOK,
        img: facebook,
        img_off: facebook_off,
        price: 20,
        key: 0,
        selected: false,
    },
    {
        type: SocialType.VK,
        img: vk,
        img_off: vk_off,
        price: 20,
        key: 1,
        selected: false,
    },
    {
        type: SocialType.OK,
        img: ok,
        img_off: ok_off,
        price: 20,
        key: 2,
        selected: false,
    },
    {
        type: SocialType.INSTAGRAM,
        img: instagram,
        img_off: instagram_off,
        price: 60,
        key: 3,
        selected: false,
    },
    {
        type: SocialType.TIKTOK,
        img: tiktok,
        img_off: tiktok_off,
        price: 60,
        key: 4,
        selected: false,
    },
];

const initialState: TariffState = {
    phone: null,
    operator: null,
    minutes: 600,
    internet: 15,
    rentRouter: false,
    buyRouter: false,
    socials: socials,
};

export const selectTariffs = (state: RootState) => state.mobileTariff;

export const mobileTariffSlice = createSlice({
    name: 'mobileTariff',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<TariffState>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state = action.payload;
        },
    },
});

export default mobileTariffSlice.reducer;