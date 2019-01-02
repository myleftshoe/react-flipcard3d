import React from 'react'
import FlipCard, { FlipCardFront, FlipCardBack } from './FlipCard'
import supercharged from './FlipCard/images/supercharged.jpg'
import { Card, CardHeader, CardMedia, CardContent, Typography } from '@material-ui/core'

export default function App() {
    return (
        <FlipCard axis='auto'
            // style={{ height: '50vh', width: 200 }}
        >
            <FlipCardFront>
                <Card style={{ height: '100%' }}>
                    <CardHeader
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        image={supercharged}
                        title="Paella dish"
                    />
                    <CardContent>
                        <Typography component="p">
                            This impressive paella is a perfect party dish and a fun meal to cook together with your
                            guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                    </CardContent>
                </Card>
            </FlipCardFront>
            <FlipCardBack>
                <h1>Back</h1>
                <h2>This is the back</h2>
            </FlipCardBack>
        </FlipCard>
    )
}
