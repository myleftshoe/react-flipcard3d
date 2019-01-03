/*
  TODO: Reinstate inert to prevent possible tabbing to back side.
*/

import React, { useRef, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Card, Front, Back } from './Card';
import Umbra from './Umbra';
import Penumbra from './Penumbra';
import animations from './animations';

FlipCard.propTypes = {
  axis: PropTypes.oneOf(['x', 'y', 'X', 'Y', 'random', 'longest', 'shortest']),
  duration: PropTypes.number,
  reverse: PropTypes.bool,
  onFlipped: PropTypes.func,
  children: function (props, propName, componentName) {
    let error = null
    let children = React.Children.toArray(props.children);

    if (children.length !== 2 ||
      children[0].type.displayName !== 'Card__Front' ||
      children[1].type.displayName !== 'Card__Back'
    ) {
      error = new Error(`Component ${componentName} must have exactly two immediate children: 'FlipCard.Front' and 'FlipCard.Back'.`);
    }
    return error
  }
};

FlipCard.Front = Front;
FlipCard.Back = Back;

export default function FlipCard({ axis = 'longest', duration = 800, reverse = false, onFlipped, ...props }) {

  let [frontSide, backSide] = Array.isArray(props.children) ? props.children : [props.children];

  const SIDES = { FRONT: 1, BACK: 2 };

  const card = useRef();
  const [size, setSize] = useState({ width: null, height: null });

  useLayoutEffect(() => {
    const { height, width } = card.current.getBoundingClientRect();
    if (size.width === width && size.height === height) return;
    setSize({ width, height });
  })

  if (!frontSide || frontSide.type.displayName !== 'Card__Front')
    frontSide = <Front>
      <h1>Front</h1>
      <p>Click or tap to flip</p>
    </Front>

  if (!backSide || backSide.type.displayName !== 'Card__Back')
    backSide = <Back><h1>Back</h1></Back>

  const FrontSide = React.forwardRef((_, ref) => React.cloneElement(frontSide, { ref, tabIndex: -1, onClick: flip }));
  const BackSide = React.forwardRef((_, ref) => React.cloneElement(backSide, { ref, tabIndex: -1, onClick: flip }));

  let locked = false;
  let side = SIDES.FRONT;

  function flip(e) {

    if (locked) return;
    locked = true;

    const [umbra, penumbra, front, back] = [...card.current.childNodes];

    let _axis = getAxis(card, axis);

    const { keyframes, timing } = animations(_axis, reverse, duration);

    switch (side) {

      case SIDES.FRONT:
        front.animate(keyframes.sideOne, timing);
        back.animate(keyframes.sideTwo, timing);
        back.focus();
        // front.current.inert = true;
        // back.current.inert = false;
        break;

      case SIDES.BACK:
        front.animate(keyframes.sideTwo, timing);
        back.animate(keyframes.sideOne, timing);
        front.focus();
        // front.current.inert = false;
        // back.current.inert = true;
        break;

      default:
        throw new Error('Unknown side');
    }

    umbra.animate(keyframes.umbra, timing);
    penumbra.animate(keyframes.penumbra, timing)
      .onfinish = () => {
        locked = false;
        side = (side === SIDES.FRONT) ? SIDES.BACK : SIDES.FRONT;
        onFlipped && onFlipped(side);
      };
  }

  return (
    <Card ref={card} {...props}>
      <Umbra style={{ width: size.width + 10, height: size.height + 10 }} />
      <Penumbra style={{ width: size.width + 70, height: size.height + 70 }} />
      <FrontSide />
      <BackSide />
    </Card>
  )
}

// Helpers ---------------------------------------------------------------------
function getAxis(card, axis) {

  let _axis = axis.toUpperCase();
  if (_axis === 'LONGEST') {
    if (card.current.offsetHeight > card.current.offsetWidth)
      _axis = 'Y';
    else
      _axis = 'X';
  }
  else if (_axis === 'SHORTEST') {
    if (card.current.offsetHeight > card.current.offsetWidth)
      _axis = 'X';
    else
      _axis = 'Y';
  }
  else if (_axis === 'RANDOM') {
    _axis = Math.random() > 0.5 ? 'X' : 'Y'
  }

  if (!'XY'.includes(_axis)) {
    throw new Error(`Invalid value provided for prop 'axis': must be one of 'X', 'Y', 'longest', 'shortest', 'random'`);
  }
  return _axis;
}
