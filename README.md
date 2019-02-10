![](https://img.shields.io/npm/v/react-flipcard3d.svg?style=flat) ![](https://img.shields.io/npm/dt/react-flipcard3d.svg?style=flat)
# react-flipcard3d

[Demo](https://myleftshoe.github.io/react-flipcard3d/)

### Install
***
```
yarn add react-flipcard3d
```

then install peer dendencies:
```
yarn add react@16.7.0-alpha.2
yarn add react-dom@16.7.0-alpha.2
yarn add @emotion/core
yarn add @emotion/styled
```
_If using npm replace `yarn add` with `npm install`_

### Usage
***
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

##### axis (string)

Value      | Description
---------- | ------------------------------------------------------------
_default_  | 'longest'
'X'        | Flip along X axis
'Y'        | Flip along Y axis
'longest'  | Flip along longest axis
'shortest' | Flip along shortest axis
'random'   | Flip along X or Y axis randomly

##### duration (integer)
duration of flip animation in milliseconds

##### reverse (boolean)

reverse the flip direction

##### onFlipped (function)

Callback to be invoked on completion of flip animation

### -

`<FlipCard.Front>` and `<FlipCard.Back>` accept a single optional prop `color`.
You can use any valid css color including 'transparent'. This is handy when the children have their own
background color - a material-ui `<Card>` component for example.
