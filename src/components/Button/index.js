import React from "react";
import PropTypes from "prop-types";
import "./button.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";

const CustomButton = ({
  variant = "primary",
  btnText,
  btnClick,
  type = "button",
  fullWidth = false,
  size = "medium",
  disabled = false,
  loading = false,
  startIcon,
  endIcon,
  className = "",
  ...rest
}) => {
  const btnClass = `btn btn-${variant} btn-${size} ${
    fullWidth ? "btn-full-width" : ""
  } ${className}`;

  return (
    <Button
      type={type}
      className={btnClass}
      onClick={btnClick}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <CircularProgress size={24} className="button-spinner" />
      ) : (
        <>
          {startIcon && (
            <span className="btn-icon btn-icon-start">{startIcon}</span>
          )}
          {btnText}
          {endIcon && <span className="btn-icon btn-icon-end">{endIcon}</span>}
        </>
      )}
    </Button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "danger",
    "warning",
    "success",
    "outline",
  ]),
  btnText: PropTypes.node.isRequired,
  btnClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  className: PropTypes.string,
};

export default CustomButton;
