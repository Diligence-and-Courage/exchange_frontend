import { Callout, DefaultButton, Text, TextField } from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAddStockMutation, useDeleteStockMutation, useUpdateBalanceMutation } from '../../api';
import { ROUTES } from '../../App/routes';
import { getUserId } from '../../store/user/selectors';
import { Padding } from './styled';

interface ConfirmProps {
    symbol: string;
    question: string;
    buttonId: string;
    toggleIsCalloutVisible: never;

    callback: 'buy' | 'ceil' | 'getMoney';
}

function isNumeric(str) {
    if (typeof str !== 'string') return false; // we only process strings!
    return (
        !Number.isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !Number.isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
}

export const Confirm = ({
    symbol,
    question,
    buttonId,
    toggleIsCalloutVisible,
    callback,
}: ConfirmProps) => {
    const [buy, buyResult] = useAddStockMutation();
    const [seil, seilResult] = useDeleteStockMutation();
    const [updateBalance, updateBalanceResult] = useUpdateBalanceMutation();

    const action = callback === 'buy' ? buy : seil;
    const userId = useSelector(getUserId);

    const [count, setCount] = useState<number>(1);

    const onChangeTextFieldValue = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            if (!newValue || isNumeric(newValue)) {
                setCount(Number(newValue) || 0);
            }
        },
        [],
    );

    const stockCallback = () =>
        action({
            userId,
            stockSymbol: symbol,
            count,
        });

    const balanceCallback = () => {
        updateBalance(count);
    };

    const isError = buyResult.isError || seilResult.isError || updateBalanceResult.isError;

    return (
        <Callout
            gapSpace={0}
            target={`#${buttonId}`}
            onDismiss={toggleIsCalloutVisible}
            setInitialFocus
        >
            <Padding>
                <Text block variant="xLarge">
                    {question}
                </Text>
                <Text block variant="small">
                    Are you shure?
                </Text>
                <TextField
                    style={{ padding: '4px' }}
                    onChange={onChangeTextFieldValue}
                    value={String(count)}
                    errorMessage={
                        isError ? 'Something went wrong. Check if you have enough money' : null
                    }
                />
                <DefaultButton onClick={callback === 'getMoney' ? balanceCallback : stockCallback}>
                    Confirm
                </DefaultButton>
            </Padding>
        </Callout>
    );
};
