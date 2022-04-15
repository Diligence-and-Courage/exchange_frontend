import { PrimaryButton } from '@fluentui/react';
import styled from 'styled-components';

import { MOBILE_WIDTH } from '../../constants/styles';

export const Wrapper = styled.div<{ justify: string }>`
    display: flex;
    flex-direction: row;
    justify-content: ${({ justify }) => justify};
    align-items: center;
    @media (min-width: ${MOBILE_WIDTH}) {
        height: 200px;
    }
`;

export const HeaderButton = styled(PrimaryButton)`
    @media (min-width: ${MOBILE_WIDTH}) {
        min-height: 52px;
    }
`;
