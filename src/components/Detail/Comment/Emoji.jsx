import React from 'react';
import styled from 'styled-components';
import { getPeople } from './emojiApi';

const Emoji = () => {
  const init = async () => {
    const people = await getPeople();
    console.log(people.flat());
  };

  init();

  return <div></div>;
};

export default Emoji;
