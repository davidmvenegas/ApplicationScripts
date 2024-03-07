// email [CUSTOM]
try {
    const labels = Array.from(document.getElementsByTagName('label'));
    const targetLabel = labels.find(label => label.textContent.includes('Email'));
    if (targetLabel) {
        const input = targetLabel.parentElement.querySelector('input[aria-required="true"]');
        if (input) {
            input.value = 'venegas1david1m1@gmail.com';
        } else {
            console.warn('Input element for "Email" not found.');
        }
    } else {
        console.warn('Label element for "Email" not found.');
    }
} catch (error) {
    console.error('Error occurred while setting the input:', error);
}

// phone number [CUSTOM]
try {
    const labels = Array.from(document.getElementsByTagName('label'));
    const targetLabel = labels.find(label => label.textContent.includes('Phone'));
    if (targetLabel) {
        const input = targetLabel.parentElement.querySelector('input[aria-required="true"]');
        if (input) {
            input.value = '8573273414';
        } else {
            console.warn('Input element for "Phone" not found.');
        }
    } else {
        console.warn('Label element for "Phone" not found.');
    }
} catch (error) {
    console.error('Error occurred while setting the input:', error);
}

const selections = {
    "A United States citizen or national": "Yes",
    "Have you been granted asylum in the United States": "No",
    "Have you been admitted as a refugee to the United States": "No",
    "A person lawfully admitted for permanent residence of the United States": "No",
    'What is the country of your birth?': 'United States',
    'Please list all countries of which you are a citizen, and, if applicable, the date you obtained citizenship.': 'United States',
    'Please list any additional countries of which you are a lawful permanent resident and, if applicable, the date you obtained permanent residency.': 'N/A',
    'Do you presently hold an active U.S. security clearance, or are you eligible to obtain and maintain a U.S. security clearance': 'Yes, I am eligible for a U.S. security clearance',
    'Do you currently, or have you in the last 5 years, worked for the US government': 'No',
    'Are you any of the following “protected individual(s)” as defined in the Immigration and Naturalization Act, 8 U.S.C. 1324b(a)(3)': 'A United States citizen or national',
    'Have you previously applied to a position at Anduril?': 'No',
    'Have you ever been employed by Anduril or any company that Anduril has acquired?': 'No',
    'This position requires access to information and technology that is subject to export controls': '1. A United States citizen or national',
};

try {
    Object.entries(selections).forEach(([labelText, answerValue]) => {
        // Find all label elements that include the specified labelText
        const labels = Array.from(document.querySelectorAll('label')).filter(label => label.textContent.includes(labelText));

        labels.forEach(label => {
            // Find the select element associated with this label
            const selectElement = label.querySelector('select');
            const inputElement = label.querySelector('input[type="text"]');

            if (selectElement) {
                // Set the select element's value based on the answerValue
                const optionToSelect = Array.from(selectElement.options).find(option => option.textContent === answerValue);
                if (optionToSelect) {
                    selectElement.value = optionToSelect.value;

                    // Dispatch a change event to ensure any event listeners are notified
                    const event = new Event('change', { bubbles: true });
                    selectElement.dispatchEvent(event);
                } else {
                    console.warn(`Answer "${answerValue}" not found for "${labelText}"`);
                }
            } else if (inputElement) {
                inputElement.value = answerValue;
            }
        });
    });
} catch (error) {
    console.error('Error setting selections:', error);
}

// set the "Why are you interested in working at Anduril?" field
try {
    const whyAndurilLabel = Array.from(document.getElementsByTagName('label')).find(label => label?.textContent.includes('Why are you interested in working at Anduril?') || label?.textContent.includes('Why do you want to work at Anduril?'));
    const textarea = whyAndurilLabel.parentElement.querySelector('textarea');
    const textareaValue = "I'm drawn to Anduril due to my expertise in software engineering, my interest in security and cutting-edge tech, and my background in leading teams and developing advanced applications. I believe I can make a valuable contribution to Anduril's mission of advancing software and hardware integration, and pushing the boundaries of innovation.";
    textarea.value = textareaValue;
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
} catch (error) {
    console.warn(`Error filling field "Why are you interested in working at Anduril?": ${error.message}`);
}

// check "Do you now, or in the future, require visa sponsorship to continue working in the United States?"
const sponsorLabel = Array.from(document.getElementsByTagName('label')).find(label => label.textContent.includes('Do you now, or in the future, require visa sponsorship to continue working in the United States?'));
if (sponsorLabel) {
    const checkboxes = Array.from(sponsorLabel.parentNode.getElementsByTagName('input'));
    for (const checkbox of checkboxes) {
        if (checkbox.type === 'checkbox' && checkbox.parentElement.textContent.includes('No')) {
            checkbox.checked = true;
        }
    }
} else {
    console.warn(`Label "Do you now, or in the future, require visa sponsorship to continue working in the United States?" not found.`);
}

// submit the application
setTimeout(() => document.getElementById('submit_app').click(), 500);