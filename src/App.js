import React from 'react'
import './App.css'
import FlipCard from './FlipCard'
import supercharged from './images/supercharged.jpg'
import { Card, CardHeader, CardMedia, CardContent, Typography } from '@material-ui/core'

export default function App() {
    return (
        <div className='App'>
            <FlipCard
                style={{ width: '260px', height: '380px' }}
            >
                <FlipCard.Front>
                    <Card style={{ height: '100%' }}>
                        <CardHeader
                            title="Shrimp and Chorizo Paella"
                            subheader="September 14, 2016"
                        />
                        <CardMedia
                            image={supercharged}
                            title="Paella dish"
                            style={{ height: 140 }}
                        />
                        <CardContent>
                            <Typography component="p">
                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                            </Typography>
                        </CardContent>
                    </Card>
                </FlipCard.Front>
                <FlipCard.Back>
                    <h1>Back</h1>
                    <h2>This is the back</h2>
                </FlipCard.Back>
            </FlipCard>
        </div>
    )
}
