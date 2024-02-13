const selections = {
    "What citizenships do you hold?": "United States",
    "What citizenships have you previously held?": "United States",
    "Are you legally entitled to work in New Zealand?": "Yes, I have a temporary visa that allows me to undertake casual or fixed term employment.",
    "Do you consent to Rocket Lab requesting information regarding citizenships, passports and visas in order to proceed with your application?": "Yes",
    "Do you consent to Rocket Lab requesting information regarding citizenships, passports and visas?": "Yes",
    "If hired, can you provide verification of your right to work in New Zealand?": "Yes",
    "Do you have any previous or pending criminal convictions or charges": "No",
    "What are your salary expectations": "150,000 USD",
    "Please share with us your salary expectations": "150,000 USD",
    "What are your salary expectations in New Zealand Dollars": "100,000",
    "What is your availability/notice period?": "2 weeks",
    "What is your current time zone?": "Pacific Standard Time",
    "Are you willing to work onsite?": "Yes",
    "If Citizenship Status Other, please explain:": "N/A",
    "Do you meet all the required qualifications": "Yes",
    "How many years of relevant work experience do you have": "6",
    "Have you previously interviewed at Rocket Lab": "No",
    "Are you currently, or have you ever been employed by the U.S. Government": "No",
    "Any offer of employment with Rocket Lab is contingent on a successful criminal background check": "Yes",
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