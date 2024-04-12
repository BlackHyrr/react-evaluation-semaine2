import { validateNotEmpty } from "../../utils/fieldValidations.js";

const commentFormConfig = (name, content) => ({
    fields: [
        {
            name: 'name',
            label: 'Name',
            value: name,
            type: 'input',
            placeholder: 'Enter a title',
            validation: {
                required: true,
                maxLength: 100,
            },
            validate: [validateNotEmpty],
            errorMessage: 'Please enter a valid title',
            actionName: 'setCommentName',
        },
        {
            name: 'body',
            label: 'Comment',
            value: content,
            type: 'textarea',
            placeholder: 'Enter your comment',
            rows: 5,
            cols: 20,
            validation: {
                required: true,
            },
            validate: [validateNotEmpty],
            errorMessage: 'Please enter a comment',
            actionName: 'setCommentBody',
        },
    ],
    buttons: [
        {
            label: 'Submit',
            type: 'submit',
            className: 'btn submit-btn',
        },
    ],
});

export default commentFormConfig;