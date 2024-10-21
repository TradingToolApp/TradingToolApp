import { useState, useEffect } from "react";

export default function useWindowSize() {
    // Initial screen width and height
    const [screenWidth, setScreenWidth] = useState(500);
    const [screenHeight, setScreenHeight] = useState(500);

    // Will run after mount
    useEffect(() => {
        // function to update screenWidth & screenHeight states
        function handleResize() {
            setScreenWidth(window.innerWidth);
            setScreenHeight(window.innerHeight);
        }

        // listen to resize event and update states
        window.addEventListener("resize", handleResize);

        // cleanup function to safely remove eventListener
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setScreenWidth(window.innerWidth);
        setScreenHeight(window.innerHeight);
    }, []);

    return { screenWidth, screenHeight };
}