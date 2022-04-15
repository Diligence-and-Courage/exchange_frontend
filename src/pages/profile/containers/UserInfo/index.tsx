import { DefaultButton, Persona, PersonaSize } from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';
import { UserInfo as UserInfoProps } from 'besthack_exchange_api_typings_and_utils';
import * as React from 'react';

import { CardUI } from '../../../../components/CardWrapper';
import { COLORS, GAP } from '../../../../constants/styles';
import { Confirm } from '../../../../containers/Confirm';
import { StyledAlignBottomRow, StyledElemRight } from '../../../../styled';
import { ColWrapper } from '../../styled';
import { Balance, Label } from './styled';

export const UserInfo = ({ firstName, lastName, email, balance }: UserInfoProps) => {
    const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
    const buttonId = useId('callout-button');

    return (
        <ColWrapper>
            <CardUI>
                <Persona
                    text={`${firstName} ${lastName}`}
                    secondaryText={email}
                    size={PersonaSize.size120}
                    initialsColor={COLORS.DEFAULT}
                />
                <StyledAlignBottomRow gap={GAP.xl}>
                    <Label>Balance</Label>
                    <Balance>{balance.toFixed(2)} $</Balance>
                </StyledAlignBottomRow>
                <StyledElemRight>
                    <DefaultButton id={buttonId} onClick={toggleIsCalloutVisible}>
                        Fill
                    </DefaultButton>
                    {isCalloutVisible && (
                        <Confirm
                            symbol="no"
                            question="Get some money"
                            buttonId={buttonId}
                            toggleIsCalloutVisible={toggleIsCalloutVisible as never}
                            callback="getMoney"
                        />
                    )}
                </StyledElemRight>
            </CardUI>
        </ColWrapper>
    );
};
