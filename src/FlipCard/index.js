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
            children[0].type !== Front ||
            children[1].type !== Back
        ) {
            error = new Error(`Component ${componentName} must have exactly two immediate children: 'FlipCard.Front' and 'FlipCard.Back'.`);
        }
        return error
    }
};

FlipCard.Front = Front;
FlipCard.Back = Back;

const FrontSidePlaceholder = <Front>
    <h1>Front</h1>
    <p>Click or tap to flip</p>
</Front>

const BackSidePlaceholder = <Back>
    <h1>Back</h1>
</Back>

export default function FlipCard({ axis = 'longest', duration = 800, reverse = false, square = false, onFlipped, children, ...otherProps }) {

    let [FrontSide, BackSide] = Array.isArray(children) ? children : [children];

    const SIDES = { FRONT: 1, BACK: 2 };

    const card = useRef();
    const [size, setSize] = useState({ width: null, height: null, borderRadius: null });

    useLayoutEffect(() => {
        const cardElement = card.current;
        const { height, width } = cardElement.getBoundingClientRect();

        const borderRadius = getBorderRadiusWithSideEffects(cardElement, square);

        if (size.width === width && size.height === height)
            return;

        setSize({ width, height, borderRadius });
    })

    if (!FrontSide || FrontSide.type !== Front)
        FrontSide = FrontSidePlaceholder;

    if (!BackSide || BackSide.type !== Back)
        BackSide = BackSidePlaceholder;

    const FrontSideClone = props => React.cloneElement(FrontSide, { tabIndex: -1, onClick: flip, ...props });
    const BackSideClone = props => React.cloneElement(BackSide, { tabIndex: -1, onClick: flip, ...props });

    let locked = false;
    let side = SIDES.FRONT;

    function flip(e) {

        if (locked) return;
        locked = true;

        const [umbra, penumbra, front, back] = [...card.current.children];

        let _axis = getAxis(card, axis);

        const zIndex = card.current.style.zIndex;
        card.current.style.zIndex = zIndex + 1;

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
                card.current.style.zIndex = zIndex;
                locked = false;
                side = (side === SIDES.FRONT) ? SIDES.BACK : SIDES.FRONT;
                onFlipped && onFlipped(side);
            };
    }

    return (
        <Card ref={card} {...otherProps}>
            <Umbra style={{ width: size.width + 10, height: size.height + 10, borderRadius: size.borderRadius }} />
            <Penumbra style={{ width: size.width + 70, height: size.height + 70, borderRadius: size.borderRadius }} />
            <FrontSideClone style={{ borderRadius: size.borderRadius }} />
            <BackSideClone style={{ borderRadius: size.borderRadius }} />
        </Card>
    )
}

// Helpers ---------------------------------------------------------------------

function getBorderRadiusWithSideEffects(cardElement, square) {

    const [, , frontElement, backElement] = [...cardElement.children];

    let frontFirstChildElement = frontElement.firstChild;
    if (!frontFirstChildElement || frontFirstChildElement.nodeType !== 1)
        frontFirstChildElement = document.createElement('div');

    let backFirstChildElement = backElement.firstChild;
    if (!backFirstChildElement || backFirstChildElement.nodeType !== 1)
        backFirstChildElement = document.createElement('div');

    const cardBorderRadius = window.getComputedStyle(cardElement).borderRadius;
    const frontBorderRadius = window.getComputedStyle(frontElement).borderRadius;
    const frontFirstChildBorderRadius = window.getComputedStyle(frontFirstChildElement).borderRadius;

    let defaultBorderRadius = '3px';
    let borderRadius;
    if (square) {
        borderRadius = '0px';
        frontFirstChildElement.style.borderRadius = '0px';
        backFirstChildElement.style.borderRadius = '0px';
    }
    else {
        if (parseInt(cardBorderRadius)) {
            borderRadius = cardBorderRadius;
            frontFirstChildElement.style.borderRadius = cardBorderRadius;
            backFirstChildElement.style.borderRadius = cardBorderRadius;
        }
        else if (parseInt(frontFirstChildBorderRadius)) {
            borderRadius = frontFirstChildBorderRadius;
            backFirstChildElement.style.borderRadius = frontBorderRadius;
        }
        else {
            borderRadius = defaultBorderRadius;
            frontFirstChildElement.style.borderRadius = defaultBorderRadius;
            backFirstChildElement.style.borderRadius = defaultBorderRadius;
        }
    }
    return borderRadius;
}

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
