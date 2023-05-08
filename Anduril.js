// select the USA citizen option from security questions
document.querySelectorAll('.application-label .text').forEach(label => {
    try {
        if (label.textContent.includes('Are you any of the following “protected individual(s)” as defined in the Immigration and Naturalization Act, 8 U.S.C. 1324b(a)(3):')) {
            label.parentElement.nextElementSibling.querySelectorAll('.application-answer-alternative').forEach(el => {
                if (el.textContent === '1. A United States citizen or national') el.previousElementSibling.checked = true;
            });
        } else if (label.textContent.includes('What is/are your preferred office location(s)?')) {
            label.parentElement.nextElementSibling.querySelectorAll('.application-answer-alternative').forEach(el => {
                if (el.textContent === 'Costa Mesa') el.previousElementSibling.checked = true;
            });
        }
    } catch (error) {
        console.warn('Error updating the checkbox for:', label.textContent, error);
    }
});


// fill in the custom fields
const customFields = {
    'What is the country of your birth?': 'United States',
    'Please list all countries of which you are a citizen, and, if applicable, the date you obtained citizenship.': 'United States',
    'Please list any additional countries of which you are a lawful permanent resident and, if applicable, the date you obtained permanent residency.': 'United States'
};

for (const labelText in customFields) {
    try {
        const labelElement = Array.from(document.querySelectorAll('.application-label .text')).find(
            (label) => label.textContent.includes(labelText)
        );
        if (labelElement) {
            const inputElement = labelElement.parentElement.nextElementSibling.querySelector("input[type='text'], textarea");
            if (inputElement) {
                inputElement.value = customFields[labelText];
            } else {
                console.warn(`No input or textarea element found for label: "${labelText}"`);
            }
        } else {
            console.warn(`No label element found for text: "${labelText}"`);
        }
    } catch (error) {
        console.error(`Error while processing label: "${labelText}"`, error);
    }
}

setTimeout(() => document.getElementById('btn-submit').click(), 500);