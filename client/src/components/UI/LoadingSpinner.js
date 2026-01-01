const LoadingSpinner = ({ size = 'large', text = 'Loading...' }) => {
  return (
    <div className="spinner">
      <div className="spinner-icon"></div>
      {text && (
        <p className="text-text-secondary">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;