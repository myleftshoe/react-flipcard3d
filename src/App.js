import React from 'react'
import FlipCard, { FlipCardFront, FlipCardBack } from './FlipCard'

export default function App() {
    return (
        <FlipCard axis='auto' style={{ width: '320px', height: '280px' }}>
            <FlipCardFront>
                <h1>Supercharged</h1>
            </FlipCardFront>
            <FlipCardBack>
            </FlipCardBack>
        </FlipCard>
    )
}
