import styled from 'styled-components';

export const Card = styled.div`
  margin: 1em;
  padding: 1em 1.5em;
  background-color: ${p => p.theme.colors.secondaryBackground};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 3px;
`;

export const CardTitle = styled.h2`
  margin: 0.25em 0 0.75em 0;
`;

export const ListItemButton = styled.button`
  padding: 0.4em 0.75em;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
`;

export const InputLabel = styled.label`
  margin-bottom: 0.25em;
`;

export const Input = styled.input`
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid #bbbbbb;
  border-radius: 3px;
  transition: all 0.15s ease;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px ${p => p.theme.colors.primary};
  }
`;

export const Button = styled.button`
  padding: 0.5em;
`;