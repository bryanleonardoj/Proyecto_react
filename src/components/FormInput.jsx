import '../styles/Form.css';

export default function FormInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error = '',
  disabled = false,
  helperText = '',
  ...props
}) {
  return (
    <div className="form-field">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`form-input ${error ? 'error' : ''}`}
        {...props}
      />
      {error && <span className="form-error">{error}</span>}
      {helperText && !error && <span className="form-helper">{helperText}</span>}
    </div>
  );
}
