import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const fetchAllCharactersThunk = createAsyncThunk(
    "fetch/all",
    async (payload, thunkApi) => {
        try {
            const raw = await fetch(
                "https://rickandmortyapi.com/api/character",
            );
            const cooked = await raw.json();
            return cooked.results;
        } catch (err) {
            thunkApi.rejectWithValue(err.message);
        }
    },
);

const fetchFilterCharactersThunk = createAsyncThunk(
    "fetch/filter",
    async (payload, thunkApi) => {
        try {
            const urlParams = new URLSearchParams();
            Object.keys(payload).forEach((query) => {
                urlParams.set(query, payload[query]);
            });

            const raw = await fetch(
                `https://rickandmortyapi.com/api/character/?${urlParams.toString()}`,
            );
            const cooked = await raw.json();
            return cooked.results;
        } catch (err) {
            thunkApi.rejectWithValue(err.message);
        }
    },
);

const fetchCharacterDetailThunk = createAsyncThunk(
    "fetch/detail",
    async (payload, thunkApi) => {
        try {
            const raw = await fetch(
                `https://rickandmortyapi.com/api/character/${payload}`,
            );
            const cooked = await raw.json();
            return cooked;
        } catch (err) {
            thunkApi.rejectWithValue(err.message);
        }
    },
);

const asyncThunkReducers = {
    fulfilled(prevState, { payload }) {
        return {
            ...prevState,
            characters: payload,
            status: {
                ...prevState.status,
                isLoading: false,
                isSuccess: true,
                errorMessage: null,
            },
        };
    },
    rejected(prevState, { payload }) {
        return {
            ...prevState,
            status: {
                ...prevState.status,
                isLoading: false,
                isSuccess: false,
                errorMessage: payload,
            },
        };
    },
    pending(prevState) {
        return {
            ...prevState,
            characters: [],
            status: {
                ...prevState.status,
                isLoading: true,
                isSuccess: false,
                errorMessage: null,
            },
        };
    },
};

const initialState = {
    characters: [],
    character: null,
    status: {
        isLoading: false,
        isSuccess: false,
        errorMessage: null,
    },
};

const rickMortySlice = createSlice({
    name: "character",
    initialState,
    reducers: {},
    extraReducers(builder) {
        return builder
            .addAsyncThunk(fetchAllCharactersThunk, asyncThunkReducers)
            .addAsyncThunk(fetchFilterCharactersThunk, asyncThunkReducers)
            .addAsyncThunk(fetchCharacterDetailThunk, {
                fulfilled(prevState, { payload }) {
                    return {
                        ...prevState,
                        character: payload,
                        status: {
                            ...prevState.status,
                            isLoading: false,
                            isSuccess: true,
                            errorMessage: null,
                        },
                    };
                },
                rejected(prevState, { payload }) {
                    return {
                        ...prevState,
                        status: {
                            ...prevState.status,
                            isLoading: true,
                            isSuccess: false,
                            errorMessage: payload,
                        },
                    };
                },
                pending(prevState) {
                    return {
                        ...prevState,
                        character: null,
                        status: {
                            ...prevState.status,
                            isLoading: true,
                            isSuccess: false,
                            errorMessage: null,
                        },
                    };
                },
            });
    },
});

export const rickMortyActions = {
    ...rickMortySlice.actions,
    getAllCharacters: fetchAllCharactersThunk,
    filterCharachters: fetchFilterCharactersThunk,
    getCharacterDetail: fetchCharacterDetailThunk
};
export default rickMortySlice.reducer;
