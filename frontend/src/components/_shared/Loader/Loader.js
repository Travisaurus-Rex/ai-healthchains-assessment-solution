import { useEffect, useState } from 'react';
import './Loader.css';

const Loader = ({ delayMs = 200, text = 'Loading...'}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), delayMs);
        return () => clearTimeout(t);
    }, [delayMs]);

    // While we're waiting for the delay to pass, render nothing.
    // avoids an annoying "flash" when the mock data is returned instantaneously
    if (!visible) return null;

    return (
        <div className="loader-container">
            <div className="loader">
                <span>{text}</span>
            </div>
        </div>
    )
}

export default Loader;