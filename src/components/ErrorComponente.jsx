import PropTypes from "prop-types";
const ErrorComponente = ({ message }) => {
  return (
    <div className="error">
      <p>{message}</p>
    </div>
  );
};
ErrorComponente.propTypes = {
  message: PropTypes.string,
};
export default ErrorComponente;
