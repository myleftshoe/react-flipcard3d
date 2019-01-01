import React, { useRef } from 'react'
import PropTypes from 'prop-types';
import './FlipCard.css'
// import { ReactComponent as Umbra } from '.images/umbra.svg';
// import { ReactComponent as Penumbra } from '.images/penumbra.svg';

function FlipCard({ axis = 'auto', duration = 800, direction = 'clockwise' }) {

  const SIDES = {
    FRONT: 1,
    BACK: 2
  };

  const front = useRef();
  const back = useRef();
  const umbra = useRef();
  const penumbra = useRef();

  let locked = false;
  let side = SIDES.FRONT;

  function flip(e) {

    if (locked) return;
    locked = true;

    const scale = (500 + 200) / 500;

    let _axis;
    if (axis === 'auto') {
      if (front.current.offsetHeight > front.current.offsetWidth)
        _axis = 'Y';
      else
        _axis = 'X';
    }
    else
      _axis = axis;

    const minus = direction === 'clockwise' ? '-' : '';

    const keyframes = {
      sideOne: [
        { transform: `translateZ(-200px) rotate${_axis}(0deg) scale(${scale})` },
        { transform: `translateZ(-100px) rotate${_axis}(0deg) scale(${scale})`, offset: 0.15 },
        { transform: `translateZ(-100px) rotate${_axis}(${minus}180deg) scale(${scale})`, offset: 0.65 },
        { transform: `translateZ(-200px) rotate${_axis}(${minus}180deg) scale(${scale})`, offset: 1 }
      ],
      sideTwo: [
        { transform: `translateZ(-200px) rotate${_axis}(${minus}180deg) scale(${scale})` },
        { transform: `translateZ(-100px) rotate${_axis}(${minus}180deg) scale(${scale})`, offset: 0.15 },
        { transform: `translateZ(-100px) rotate${_axis}(${minus}360deg) scale(${scale})`, offset: 0.65 },
        { transform: `translateZ(-200px) rotate${_axis}(${minus}360deg) scale(${scale})`, offset: 1 }
      ],
      umbra: [
        { opacity: 0.3, transform: `translateY(2px) rotate${_axis}(0deg)` },
        { opacity: 0.0, transform: `translateY(62px) rotate${_axis}(0deg)`, offset: 0.15 },
        { opacity: 0.0, transform: `translateY(62px) rotate${_axis}(${minus}180deg)`, offset: 0.65 },
        { opacity: 0.3, transform: `translateY(2px) rotate${_axis}(${minus}180deg)`, offset: 1 }
      ],
      penumbra: [
        { opacity: 0.0, transform: `translateY(2px) rotate${_axis}(0deg)` },
        { opacity: 0.5, transform: `translateY(62px) rotate${_axis}(0deg)`, offset: 0.15 },
        { opacity: 0.5, transform: `translateY(62px) rotate${_axis}(${minus}180deg)`, offset: 0.65 },
        { opacity: 0.0, transform: `translateY(2px) rotate${_axis}(${minus}180deg)`, offset: 1 }
      ],
    }

    const timing = {
      duration: duration,
      iterations: 1,
      easing: 'ease-in-out',
      fill: 'forwards'
    };

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
      .onfinish = _ => {
        locked = false;
        side = (side === SIDES.FRONT) ?
          SIDES.BACK :
          SIDES.FRONT;
      };
  }



  return (
    <div className="sc-card">
      <div ref={umbra} className="umbra" />
      <div ref={penumbra} className="penumbra" />

      <div ref={front} className="front" tabIndex="-1" onClick={flip}>
        <h1>Supercharged</h1>
      </div>

      <div ref={back} className="back" tabIndex="-1" onClick={flip}>
      </div>
    </div>
  )
}

FlipCard.propTypes = {
  axis: PropTypes.oneOf(['auto', 'x', 'y', 'X', 'Y']),
  duration: PropTypes.number,
  direction: PropTypes.oneOf(['clockwise', 'anticlockwise']),
};

export default FlipCard;