import React, { useRef } from 'react'
import PropTypes from 'prop-types';
// import './FlipCard.css'
import { Card, Front, Back, Umbra, Penumbra } from './styles';
import animations from './animations';

function FlipCard({ axis = 'auto', duration = 800, direction = 'clockwise', onFlipped }) {

  const SIDES = { FRONT: 1, BACK: 2 };

  const card = useRef();
  const front = useRef();
  const back = useRef();
  const umbra = useRef();
  const penumbra = useRef();

  let locked = false;
  let side = SIDES.FRONT;

  function flip(e) {

    if (locked) return;
    locked = true;

    let _axis = getAxis(card, axis);

    const { keyframes, timing } = animations(_axis, direction, duration);

    switch (side) {

      case SIDES.FRONT:
        front.current.animate(keyframes.sideOne, timing);
        back.current.animate(keyframes.sideTwo, timing);
        back.current.focus();
        // front.current.inert = true;
        // back.current.inert = false;
        break;

      case SIDES.BACK:
        front.current.animate(keyframes.sideTwo, timing);
        back.current.animate(keyframes.sideOne, timing);
        front.current.focus();
        // front.current.inert = false;
        // back.current.inert = true;
        break;

      default:
        throw new Error('Unknown side');
    }

    umbra.current.animate(keyframes.umbra, timing);
    penumbra.current.animate(keyframes.penumbra, timing)
      .onfinish = () => {
        locked = false;
        side = (side === SIDES.FRONT) ? SIDES.BACK : SIDES.FRONT;
        onFlipped && onFlipped(side);
      };
  }

  return (
    <Card ref={card}>
      <Umbra ref={umbra} />
      <Penumbra ref={penumbra} />

      <Front ref={front} tabIndex="-1" onClick={flip}>
        <h1>Supercharged</h1>
      </Front>

      <Back ref={back} tabIndex="-1" onClick={flip}>
      </Back>
    </Card>
  )
}

FlipCard.propTypes = {
  axis: PropTypes.oneOf(['auto', 'x', 'y', 'X', 'Y', 'random']),
  duration: PropTypes.number,
  direction: PropTypes.oneOf(['clockwise', 'anticlockwise']),
  onFlipped: PropTypes.func,
};

export default FlipCard;

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
