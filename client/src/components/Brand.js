import React from 'react';
import styled from 'styled-components';
import githubIcon from '../assets/github-icon.png';

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 7.5px;
  right: 10px;
  font-size: 0.75em;  

  & > a {
    color: black;
    text-decoration: none;
  }
`;

const AuthorLink = styled.a`  
  &:hover {
    opacity: 0.5;
  }
`;

const GitHubIcon = styled.img`
  margin-left: 0.5em;
  width: 1.25em;

  &:hover {
    opacity: 0.5;
  }
`;

const Brand = () => {
  return (
    <BrandContainer>
      <AuthorLink href="https://en.wikipedia.org/wiki/Daniel_(Elton_John_song)">
        Daniel Ryu 2021
      </AuthorLink>
      <a href="https://github.com/dryu99/queue-tip">
        <GitHubIcon src={githubIcon} alt="github-icon"/>
      </a>
    </BrandContainer>
  );
};

export default Brand;