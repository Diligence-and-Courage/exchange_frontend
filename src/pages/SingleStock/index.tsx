import { StockCandle, StockResolution } from 'besthack_exchange_api_typings_and_utils';
import { formatISO, sub } from 'date-fns';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useStockBySymbolQuery, useStockCandlesQuery } from '../../api';
import { ChartComponent, ChartType } from '../../components/Chart';
import { CommandBar } from './CommadBar';
import { rangeConfig, RangeType } from './Range';

export const SingleStock: FC = () => {
    const { symbol } = useParams<{ symbol: string }>();

    const [range, setRange] = useState<RangeType>('5d');

    const { data: stockData } = useStockBySymbolQuery({ symbol });
    const { data: candlesData, isLoading } = useStockCandlesQuery({
        symbols: symbol,
        resolution: rangeConfig[range].resolution,
        timeFrom: formatISO(sub(Date.now(), rangeConfig[range].duration), {
            representation: 'date',
        }),
    });

    const [type, setType] = useState<ChartType>('area');
    const [withVolume, setWithVolume] = useState<boolean>(false);

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (candlesData.data[0].candles === 'Data not found') {
        return <div>No data found</div>;
    }

    return (
        <>
            <CommandBar
                currentRange={range}
                currVolume={withVolume}
                currentChart={type}
                onVolumeChange={() => setWithVolume(!withVolume)}
                onTypeChange={(newType) => setType(newType)}
                onRangeChange={(newRange) => setRange(newRange)}
            />
            <div style={{ width: '600px', height: '400px' }}>
                <ChartComponent
                    isMinimal
                    withVolume={withVolume}
                    type={type}
                    data={candlesData.data[0].candles as StockCandle[]}
                />
            </div>
        </>
    );
};
