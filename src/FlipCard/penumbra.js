export default ({ height, width }) => `
    <svg version="1.1" class="shape-reference" xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
        <filter id="blur-12">
        <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
        </filter>
    </defs>
    <rect filter="url(#blur-12)" id="Rectangle" stroke="none" fill="#000000" fill-rule="evenodd" x="35" y="35" width="${width - 70}" height="${height - 70}"></rect>
    </svg>
`