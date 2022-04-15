import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    AppResponse,
    AuthUserInfo,
    CreateUserInfo,
    Quote,
    Stock,
    StockCandleQuery,
    StockCandleResponse,
    UserInfo,
    UserStock,
} from 'besthack_exchange_api_typings_and_utils';

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['UserStocks', 'User'],
    baseQuery: fetchBaseQuery({ baseUrl: process.env.API_URL, credentials: 'include' }),
    endpoints: (builder) => ({
        // user
        getUserInfo: builder.query<{ data: UserInfo }, void>({
            query: () => '/user',
            providesTags: ['User'],
        }),
        register: builder.mutation<UserInfo, CreateUserInfo>({
            query: (args) => ({
                url: '/user/register',
                method: 'POST',
                body: args,
            }),
        }),
        login: builder.mutation<UserInfo, AuthUserInfo>({
            query: (info) => ({
                url: '/user/login',
                method: 'POST',
                body: info,
            }),
        }),
        // user stocks
        getUserStocks: builder.query<AppResponse<[Stock & Quote & { count: number }]>, void>({
            query: () => '/user/stocks',
            providesTags: ['UserStocks'],
        }),
        addStock: builder.mutation<unknown, UserStock>({
            query: (symbol) => ({
                url: 'user/stocks',
                method: 'POST',
                body: symbol,
            }),
            invalidatesTags: ['UserStocks', 'User'],
        }),
        deleteStock: builder.mutation<unknown, UserStock>({
            query: (symbol) => ({
                url: 'user/stocks',
                method: 'DELETE',
                body: symbol,
            }),
            invalidatesTags: ['UserStocks', 'User'],
        }),
        // all stocks
        getAllStocks: builder.query<AppResponse<[Stock & Quote]>, void>({
            query: () => '/stock',
        }),
        stockBySymbol: builder.query<
            AppResponse<Stock & Quote & { count: number }>,
            { symbol: string }
        >({
            query: ({ symbol }) => `/stock/${symbol}`,
            providesTags: ['UserStocks'],
        }),
        updateBalance: builder.mutation<AppResponse<UserInfo>, number>({
            query: (newBalance) => ({
                url: '/user/balance',
                method: 'POST',
                body: {
                    count: newBalance,
                },
            }),
            invalidatesTags: ['UserStocks', 'User'],
        }),
        stockCandles: builder.query<AppResponse<StockCandleResponse>, StockCandleQuery>({
            query: ({ symbols, resolution, timeFrom, timeTo }) => {
                let params = `symbols=${symbols}`;

                if (resolution) {
                    params += `&resolution=${resolution}`;
                }

                if (timeFrom) {
                    params += `&timeFrom=${timeFrom}`;
                }

                if (timeTo) {
                    params += `&timeTo=${timeTo}`;
                }

                return `/stock/candles?${params}`;
            },
        }),
    }),
});

export const {
    useGetUserInfoQuery,
    useGetAllStocksQuery,
    useStockBySymbolQuery,
    useStockCandlesQuery,
    useRegisterMutation,
    useLoginMutation,
    useGetUserStocksQuery,
    useAddStockMutation,
    useDeleteStockMutation,
    useUpdateBalanceMutation,
} = api;
