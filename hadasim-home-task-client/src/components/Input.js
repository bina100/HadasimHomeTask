import React from 'react'

const Input = ({ label, placeholder, type, value, className, disabled,  inputChange }) => {

    return (
        <div className='input-class'>
            {label ? <label>{label}</label> : null}
            <input
                placeholder={placeholder}
                type={type}
                value={value ? value : ''}
                className={className}
                disabled={disabled ? true : false}
                onChange={(e) => inputChange(e.target.value)}
            />
        </div>
    )
}
export default Input