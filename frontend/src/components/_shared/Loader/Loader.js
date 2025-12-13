import './Loader.css';

const Loader = ({ text = 'Loading...'}) => {
    return (
        <div className="loader-container">
            <div className="loader">
                <span>{text}</span>
            </div>
        </div>
    )
}

export default Loader;