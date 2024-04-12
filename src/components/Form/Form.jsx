import { useDispatch, useSelector } from "react-redux";
import './Form.css';
import { useState } from "react";
import FormField from "../FormField/FormField";
import Button from "../Button/Button";

const Form = ({ formConfig, addEntityAction, actions }) => {

    const dispatch = useDispatch()
    const [formErrors, setFormErrors] = useState({});

    const validateForm = (formConfig) => {
        const errors = {};
    
        for (let field of Object.values(formConfig.fields)) {
            console.log(field);
            for (let validate of field.validate) {
                const errorMessage = validate(field.value);
                if (errorMessage) {
                    errors[field.name] = errorMessage;
                    break;
                }
            }
        }
    
        return errors;
    }

    const handleInputChange = (e, actionName) => {
        if (typeof actions[actionName] !== 'function') {
            console.error(`Error: ${actionName} is not a function`);
            return;
        }

        dispatch(actions[actionName](e.target.value));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(addEntityAction);
    
        const errors = validateForm(formConfig);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        console.log('form submitted', e)
        dispatch(addEntityAction);
    }

    return (
        <form onSubmit={handleSubmit} className={'form-container'}>
            {formConfig.fields.map((field, index) => (
                <div key={index}>
                    <FormField
                        key={index}
                        fieldType={field.type}
                        field={field}
                        formErrors={formErrors}
                        handleInputChange={handleInputChange}
                        actionName={field.actionName}
                        required={field.validation.required || false}
                    />
                </div>
            ))}
            {formConfig.buttons.map((button, index) => (
                <Button
                    key={index}
                    label={button.label}
                    type={button.type}
                    className={button.className}
                />
            ))}
        </form>
    )
}

export default Form;