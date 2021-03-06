import styled from 'styled-components/macro'

export const Header = styled.div`
  font-size: 24px;
  font-weight: bold;
  line-height: 1.33;
`
export const Title = styled.div`
  font-size: 18px;
  line-height: 24px;
  margin: 5px 0;
  color: ${(p) => p.theme.palette.text.primary};
`
export const Text = styled.div`
  font-size: 14px;
  line-height: 21px;
  color: ${(p) => p.theme.colors.text};
`
export const AccentText = styled.span`
  color: ${(p) => p.theme.colors.primary};
`
