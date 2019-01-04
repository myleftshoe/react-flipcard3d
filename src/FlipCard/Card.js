import styled from 'styled-components/macro'

export const Card = styled.div`
    position: relative;
    perspective: 500px;
    will-change: transform;
    width: 260px;
    height: 380px;
`

const Side = styled.div`
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
    /* background: #444; */
    color: #FFF;
`

export const Front = styled(Side)`${({ color = 'cadetblue' }) => `
    background-color: ${color}
`}`

export const Back = styled(Side)`${({ color = 'indianred' }) => `
    background-color: ${color};
    transform: rotateY(180deg);
`}`
