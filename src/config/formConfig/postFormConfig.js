import { validateNotEmpty } from "../../utils/fieldValidations.js";

const postFormConfig = (title, body) => ({
    fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'input',
            value: title,
            placeholder: 'Enter title',
            validation: {
                required: true,
                maxLength: 100,
            },
            validate: [validateNotEmpty],
            errorMessage: 'Please enter a valid title',
            actionName: 'setPostTitle',
        },
        {
            name: 'content',
            label: 'Content',
            type: 'textarea',
            value: body,
            placeholder: 'Enter content',
            rows: 5,
            cols: 50,
            validation: {
                required: true,
            },
            validate: [validateNotEmpty],
            errorMessage: 'Please enter content for the post',
            actionName: 'setPostBody',
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

export default postFormConfig;