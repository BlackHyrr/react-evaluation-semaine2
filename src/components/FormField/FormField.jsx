import './FormField.css';

const FormField = ({ fieldType, field, formErrors, handleInputChange, actionName, required }) => {
    console.log(required)
    switch (fieldType) {
        case 'input':
            return (
                <div className={'field-group'}>
                    <label className={'form-label' + (required ? ' required' : '')}>{field.label}</label>
                    <input
                        className={formErrors[field.name] ? 'invalid-field' : ''}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={(e) => handleInputChange(e, actionName)}
                        required={required ? 'true' : 'false'}
                    />
                    <div className={'form-error'}>
                        {formErrors[field.name] && <span>{formErrors[field.name]}</span>}
                    </div>
                </div>
            );
        case 'textarea':
            return (
                <div className={'field-group'}>
                    <label className={'form-label' + (required ? ' required' : '')}>{field.label}</label>
                    <textarea
                        className={formErrors[field.name] ? 'invalid-field' : ''}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={(e) => handleInputChange(e, actionName)}
                        rows={field.rows || 5}
                        cols={field.cols || 50}
                        required={required ? 'true' : 'false'}
                    />
                    <div className={'form-error'}>
                        {formErrors[field.name] && <span>{formErrors[field.name]}</span>}
                    </div>
                </div>
            );
        case 'select':
            return (
                <div className={'field-group'}>
                    <label 
                        className={'form-label' + (required ? ' required' : '')}
                    >{field.name}</label>
                    <select
                        className={formErrors[field.name] ? 'invalid-field' : ''}
                        value={field.value}
                        onChange={(e) => handleInputChange(e, actionName)}
                        required={required ? 'true' : 'false'}
                    >
                        {field.options && field.options.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <div className={'form-error'}>
                        {formErrors[field.name] && <span>{formErrors[field.name]}</span>}
                    </div>
                </div>
            );
        default:
            return null;
    }
}

export default FormField;