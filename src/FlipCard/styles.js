import styled from 'styled-components/macro'
import img from './images/supercharged.jpg'
import umbraSvg from './images/umbra.svg'
import penumbraSvg from './images/penumbra.svg'

export const Card = styled.div`
    position: relative;
    perspective: 500px;
    will-change: transform;
    width: 260px;
    height: 380px;
`

export const Front = styled.div`
    backface-visibility: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    overflow: hidden;
    /*  */
    background: #444;
    color: #FFF;
`

export const Back = styled.div`
    backface-visibility: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    overflow: hidden;
    /*  */
    /* background: url(${img}) center center no-repeat; */
    background: #444;
    color: #FFF;
    transform: rotateY(180deg);
`

export const Umbra = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    backface-visibility: visible;
    /*  */
    width: 270px;
    height: 390px;
    top: -5px;
    left: -5px;
    background: url(${umbraSvg}) center center no-repeat;
    transform: translateY(2px);
    opacity: 0.3;
`

export const Penumbra = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    backface-visibility: visible;
    /*  */
    width: 330px;
    height: 450px;
    top: -35px;
    left: -35px;
    background: url(${penumbraSvg}) center center no-repeat;
    transform: translateY(2px);
    opacity: 0;
`
