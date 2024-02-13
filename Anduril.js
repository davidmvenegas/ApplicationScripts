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

// submit the application
setTimeout(() => document.getElementById('submit_app').click(), 500);