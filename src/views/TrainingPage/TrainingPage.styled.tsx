import styled from 'styled-components';
import { media } from 'utils/breakpoints';

export const Background = styled.div`
  background-color: var(--bg-color-blue);
  min-height: calc(100vh - var(--header-height));
  display: flex;
  flex-direction: column;
`;

export const Thumb = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  @media ${media.maxTablet} {
    padding: 0 39px;
  }

  @media ${media.onlyTablet} {
    padding: 0 45px;
  }

  @media ${media.maxMobile} {
    padding: 0 25px;
  }
`;
