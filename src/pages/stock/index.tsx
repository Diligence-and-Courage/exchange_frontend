import { camelize } from 'besthack_exchange_api_typings_and_utils';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetUserInfoQuery, useStockBySymbolQuery } from '../../api';
import { ROUTES } from '../../App/routes';
import { Header } from '../../components/Header';
import { Layout } from '../../components/Layout';
import { HEADER_BUTTONS, HEADERS } from '../../constants/texts';
import { Content } from './containers/Content';
import { RightPanel } from './containers/RightPanel';

export const StockPage = () => {
    const { symbol } = useParams();

    const { data, isSuccess } = useStockBySymbolQuery({ symbol });
    const stock: typeof data.data = useMemo(() => {
        if (isSuccess && data) {
            return camelize(data.data) as typeof data.data;
        }
        return {} as typeof data.data;
    }, [data, isSuccess]);

    const user = useGetUserInfoQuery();
    const buttons = useMemo(() => {
        const mainButton = {
            text: HEADER_BUTTONS.goMain,
            link: ROUTES.main,
        };
        if (user.isError) {
            return [
                {
                    text: HEADER_BUTTONS.goLogin,
                    link: ROUTES.login,
                },
                mainButton,
            ];
        }
        if (user.isSuccess) {
            return [
                {
                    text: HEADER_BUTTONS.goProfile,
                    link: ROUTES.profile,
                },
                mainButton,
            ];
        }
        return [mainButton];
    }, [user]);

    return (
        <Layout
            header={<Header pageName={HEADERS.stock(symbol)} buttons={buttons} />}
            left={isSuccess ? <Content stock={stock} /> : null}
            right={
                <RightPanel
                    isSuccess={user.isSuccess}
                    isError={user.isError}
                    user={user.data}
                    stockAmount={stock.count}
                    stockCost={stock.count * stock.currentPrice}
                    symbol={stock.symbol}
                />
            }
        />
    );
};
