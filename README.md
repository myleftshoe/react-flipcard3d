[Demo](https://myleftshoe.github.io/react-flipcard3d/)

### Usage
***
___Install peer dependencies first!___
- react@16.7.0-alpha.2
- react-dom@16.7.0-alpha.2
- @emotion/core
- @emotion/styled
```JSX
import FlipCard from 'react-flipcard3d';
...
<FlipCard>
    <FlipCard.Front>
        ...
    </FlipCard.Front>
    <FlipCard.Back>
        ...
    </FlipCard.Back>
</FlipCard>
```
### Props
***
_*** All props are optional ***_

#### axis (string)

Value      | Description
---------- | ------------------------------------------------------------
_default_  | 'longest'
'X'        | Flip along X axis
'Y'        | Flip along Y axis
'longest'  | Flip along longest axis
'shortest' | Flip along shortest axis
'random'   | Flip along X or Y axis randomly

#### duration (integer)
duration of flip animation in milliseconds

#### reverse (boolean)

reverse the flip direction

#### onFlipped (function)

Callback to be invoked on completion of flip animation


`<FlipCard.Front>` and `<FlipCard.Back>` accept a single optional prop `color`.
You can use any valid css color including 'transparent'. This is handy when the children have there own
background color - a material-ui <Card> component for example.
