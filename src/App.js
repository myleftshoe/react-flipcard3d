import React from 'react'
import FlipCard, { FlipCardFront, FlipCardBack } from './FlipCard'
import supercharged from './FlipCard/images/supercharged.jpg';

export default function App() {
    return (
        <FlipCard axis='auto'>
            <FlipCardFront>
                <h1>Front</h1>
                <h2>This is the front</h2>
                <img src={supercharged} alt="" />
            </FlipCardFront>
            <FlipCardBack>
                <h1>Back</h1>
                <h2>This is the back</h2>
            </FlipCardBack>
        </FlipCard>
    )
}
