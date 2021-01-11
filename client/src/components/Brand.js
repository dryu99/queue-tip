import React from 'react';
import styled from 'styled-components';

const BrandContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 0.75em;  

  & > a {
    color: black;
    text-decoration: none;
  }
`;

const Brand = () => {
  return (
    <BrandContainer>
      <a href="https://en.wikipedia.org/wiki/Daniel_(Elton_John_song)">Daniel Ryu 2021</a>
    </BrandContainer>
  );
};

export default Brand;