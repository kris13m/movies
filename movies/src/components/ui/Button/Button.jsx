
import './Button.css'; 


function Button({ children, className, ...props }) {
  
  const buttonClassName = `shared-button ${className || ''}`.trim();

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
}

export default Button;