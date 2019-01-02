/*
  TODO: Reinstate inert to prevent possible tabbing to back side.
*/

import React, { useRef, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Card, Front, Back, Umbra, Penumbra } from './styles';
import animations from './animations';

FlipCard.propTypes = {
  axis: PropTypes.oneOf(['auto', 'x', 'y', 'X', 'Y', 'random']),
  duration: PropTypes.number,
  direction: PropTypes.oneOf(['clockwise', 'anticlockwise']),
  onFlipped: PropTypes.func,
};

export { Front as FlipCardFront }
export { Back as FlipCardBack };

export default function FlipCard({ axis = 'auto', duration = 800, direction = 'clockwise', onFlipped, children: [frontSide, backSide], ...props }) {

  const SIDES = { FRONT: 1, BACK: 2 };

  const card = useRef();
  const [umbraWidth, setUmbraWidth] = useState();

  useLayoutEffect(() => {
    console.log(card.current.offsetHeight, card.current.offsetWidth, card.current.getBoundingClientRect())
    const { height, width } = card.current.getBoundingClientRect();
    console.log(window.getComputedStyle(card.current));
    const [umbra, penumbra, front, back] = [...card.current.childNodes];
    umbra.style.height = height + 10 + 'px';
    umbra.style.width = width + 10 + 'px';
    umbra.style.top = '-5px';
    umbra.style.left = '-5px';
    penumbra.style.height = height + 70 + 'px';
    penumbra.style.width = width + 70 + 'px';
    penumbra.style.top = '-35px';
    penumbra.style.left = '-35px';
  })

  const FrontSide = React.forwardRef((_, ref) => React.cloneElement(frontSide, { ref, tabIndex: -1, onClick: flip }));
  const BackSide = React.forwardRef((_, ref) => React.cloneElement(backSide, { ref, tabIndex: -1, onClick: flip }));

  let locked = false;
  let side = SIDES.FRONT;

  function flip(e) {

    if (locked) return;
    locked = true;

    console.log(card.current.offsetHeight, card.current.offsetWidth, card.current.getBoundingClientRect())

    const [umbra, penumbra, front, back] = [...card.current.childNodes];

    let _axis = getAxis(card, axis);

    const { keyframes, timing } = animations(_axis, direction, duration);

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
      <Umbra style={{ width: umbraWidth }} />
      <Penumbra />
      <FrontSide />
      <BackSide />
    </Card>
  )
}

// Helpers ---------------------------------------------------------------------
function getAxis(card, axis) {

  let _axis = axis.toUpperCase();
  if (_axis === 'AUTO') {
    if (card.current.offsetHeight > card.current.offsetWidth)
      _axis = 'Y';
    else
      _axis = 'X';
  }
  else if (_axis === 'RANDOM') {
    _axis = Math.random() > 0.5 ? 'X' : 'Y'
  }

  if (!'XY'.includes(_axis)) {
    throw new Error(`Invalid value provided for prop 'axis': must be one of 'X', 'Y', 'auto', 'random'`);
  }
  return _axis;
}
