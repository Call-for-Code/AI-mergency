import React from 'react';

const NavTab = (props) => {
  const {
    isActive,
    index,
    onClick,
    name,
  } = props;
  const classes = isActive ? 'navtab active' : 'navtab';
  return (
    <span className={classes}>
      <span
        key={index}
        onClick={onClick}
      >
        {name}
      </span>
    </span>
  );
};

const navbar = (props) => {
  const { names, onClick, activeIndex } = props;
  const tabs = names
    .map((name, index) => (
      <NavTab
        index={index}
        onClick={() => onClick(index)}
        name={name}
        isActive={activeIndex === index}
      />
    ));
  return <div className="navbar">{tabs}</div>;
};

export default navbar;
