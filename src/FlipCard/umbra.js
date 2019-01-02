export default ({ height, width }) => `
    <svg version="1.1" class="shape-reference" xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
        <filter id="blur-2">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
    </defs>
    <rect filter="url(#blur-2)" id="Rectangle" stroke="none" fill="#000000" fill-rule="evenodd" x="5" y="5" width="${width - 10}" height="${height - 10}"></rect>
    </svg>
`