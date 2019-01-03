import styled from 'styled-components/macro'

const Penumbra = styled.div`
    position: absolute;
    backface-visibility: visible;
    /*  */
    transform: translateY(2px);
    opacity: 0;
    ${props => {
        const { height, width } = props.style;
        console.log(svg({ height, width }))
        return `
        background: url("data:image/svg+xml;utf8,${encodeURIComponent(svg({ height, width }))}") center center no-repeat;
        width: ${width}px;
        height: ${height}px;
        top: -35px;
        left: -35px;
    `}}
`

const svg = ({ height, width }) => `
    <svg version="1.1" class="shape-reference" xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
        <filter id="blur-12">
        <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
        </filter>
    </defs>
    <rect filter="url(#blur-12)" id="Rectangle" stroke="none" fill="#000000" fill-rule="evenodd" x="35" y="35" width="${width - 70}" height="${height - 70}"></rect>
    </svg>
`

export default Penumbra;