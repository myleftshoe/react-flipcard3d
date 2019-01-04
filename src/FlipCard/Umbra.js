import styled from 'styled-components/macro'

const Umbra = styled.div`
    position: absolute;
    backface-visibility: visible;
    /*  */
    transform: translateY(2px);
    opacity: 0.3;
    ${props => {
        const { height, width, borderRadius } = props.style;
        return `
        background: url("data:image/svg+xml;utf8,${encodeURIComponent(svg({ height, width, borderRadius }))}") center center no-repeat;
        width: ${width}px;
        height: ${height}px;
        top: -5px;
        left: -5px;
    `}}
`

const svg = ({ height, width, borderRadius }) => `
    <svg version="1.1" class="shape-reference" xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
        <filter id="blur-2">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
    </defs>
    <rect
        filter="url(#blur-2)"
        id="Rectangle"
        stroke="none"
        fill="#000000"
        fill-rule="evenodd"
        x="5"
        y="5"
        width="${width - 10}"
        height="${height - 10}"
        rx="${borderRadius}"
        ry="${borderRadius}"
    />
    </svg>
`

export default Umbra;