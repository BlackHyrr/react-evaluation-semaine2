import './Button.css';

const Button = ({ label, type, className, onClick }) => {
    return (
        <button className={className} type={type} onClick={onClick}>
            {label}
        </button>
    );
}

export default Button;