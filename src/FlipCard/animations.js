export default function animation(axis, reverse, duration) {

    const scale = (500 + 200) / 500;
    const minus = reverse ? '-' : '';

    const keyframes = {
        sideOne: [
            { transform: `translateZ(-200px) rotate${axis}(0deg) scale(${scale})` },
            { transform: `translateZ(-100px) rotate${axis}(0deg) scale(${scale})`, offset: 0.15 },
            { transform: `translateZ(-100px) rotate${axis}(${minus}180deg) scale(${scale})`, offset: 0.65 },
            { transform: `translateZ(-200px) rotate${axis}(${minus}180deg) scale(${scale})` }
        ],
        sideTwo: [
            { transform: `translateZ(-200px) rotate${axis}(${minus}180deg) scale(${scale})` },
            { transform: `translateZ(-100px) rotate${axis}(${minus}180deg) scale(${scale})`, offset: 0.15 },
            { transform: `translateZ(-100px) rotate${axis}(${minus}360deg) scale(${scale})`, offset: 0.65 },
            { transform: `translateZ(-200px) rotate${axis}(${minus}360deg) scale(${scale})` }
        ],
        umbra: [
            { opacity: 0.3, transform: `translateY(2px) rotate${axis}(0deg)` },
            { opacity: 0.0, transform: `translateY(62px) rotate${axis}(0deg)`, offset: 0.15 },
            { opacity: 0.0, transform: `translateY(62px) rotate${axis}(${minus}180deg)`, offset: 0.65 },
            { opacity: 0.3, transform: `translateY(2px) rotate${axis}(${minus}180deg)` }
        ],
        penumbra: [
            { opacity: 0.0, transform: `translateY(2px) rotate${axis}(0deg)` },
            { opacity: 0.5, transform: `translateY(62px) rotate${axis}(0deg)`, offset: 0.15 },
            { opacity: 0.5, transform: `translateY(62px) rotate${axis}(${minus}180deg)`, offset: 0.65 },
            { opacity: 0.0, transform: `translateY(2px) rotate${axis}(${minus}180deg)` }
        ],
    }

    const timing = {
        duration: duration,
        iterations: 1,
        easing: 'ease-in-out',
        fill: 'forwards'
    };

    return { keyframes, timing }
}