import styled from 'styled-components/macro'
import img from './images/supercharged.jpg'
import umbraSvg from './umbra'
import penumbraSvg from './penumbra'

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
    position: absolute;
    backface-visibility: visible;
    /*  */
    transform: translateY(2px);
    opacity: 0.3;
    ${props => {
        const { height, width } = props.style;
        console.log(umbraSvg({ height, width }))
        return `
        background: url("data:image/svg+xml;utf8,${encodeURIComponent(umbraSvg({ height, width }))}") center center no-repeat;
        width: ${width}px;
        height: ${height}px;
        top: -5px;
        left: -5px;
    `}}
`

export const Penumbra = styled.div`
    position: absolute;
    backface-visibility: visible;
    /*  */
    transform: translateY(2px);
    opacity: 0;
    ${props => {
        const { height, width } = props.style;
        console.log(penumbraSvg({ height, width }))
        return `
        background: url("data:image/svg+xml;utf8,${encodeURIComponent(penumbraSvg({ height, width }))}") center center no-repeat;
        width: ${width}px;
        height: ${height}px;
        top: -35px;
        left: -35px;
    `}}
`
