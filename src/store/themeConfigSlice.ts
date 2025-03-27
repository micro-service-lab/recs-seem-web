import { createSlice } from '@reduxjs/toolkit';
import i18next from 'i18next';
import themeConfig from '@/theme.config';

const defaultState = {
    isDarkMode: false,
    theme: 'light',
    locale: 'en',
    sidebar: false,
    pageTitle: '',
    languageList: [
        { code: 'en', name: 'English' },
        { code: 'ja', name: '日本語' },
    ],
};

const initialState = {
    theme: localStorage.getItem('theme') || themeConfig.theme,
    locale: localStorage.getItem('i18nextLng') || themeConfig.locale,
    isDarkMode: false,
    sidebar: localStorage.getItem('sidebar') || defaultState.sidebar,
    languageList: [
        { code: 'en', name: 'English' },
        { code: 'ja', name: '日本語' },
    ],
};

const themeConfigSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        toggleTheme(state, { payload }) {
            payload = payload || state.theme; // light | dark | system
            localStorage.setItem('theme', payload);
            state.theme = payload;
            if (payload === 'light') {
                state.isDarkMode = false;
            } else if (payload === 'dark') {
                state.isDarkMode = true;
            } else if (payload === 'system') {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    state.isDarkMode = true;
                } else {
                    state.isDarkMode = false;
                }
            }

            if (state.isDarkMode) {
                document.querySelector('body')?.classList.add('dark');
            } else {
                document.querySelector('body')?.classList.remove('dark');
            }
        },
        toggleLocale(state, { payload }) {
            payload = payload || state.locale;
            i18next.changeLanguage(payload);
            state.locale = payload;
        },
        toggleSidebar(state) {
            state.sidebar = !state.sidebar;
        },

        setPageTitle(_, { payload }) {
            document.title = `${payload} | ReCS/SEEM - アルゴリズム工学研究室`;
        },
    },
});

export const { toggleTheme, toggleLocale, toggleSidebar, setPageTitle } = themeConfigSlice.actions;

export default themeConfigSlice.reducer;
