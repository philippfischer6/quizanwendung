import React from 'react';

import classes from './Card.module.css';

//Card Component
//Wrap arround Components for Card border
const Card = (props) => {
  return <div className={`${classes.card} ${props.className}`}>{props.children}</div>;
};

export default Card;
