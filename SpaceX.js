// click the first "Where are you located" option if it's not already selected
try {
    document.querySelector('li[role="option"]').click();
} catch (error) {
    console.error('Error occurred while clicking the element:', error);
}

// check the box for "I hereby declare the information provided is true..."
try {
    const checkboxLabel = document.querySelector('label:has(input[aria-required="true"])');
    if (checkboxLabel) {
        const checkbox = checkboxLabel.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.checked = true;
        } else {
            console.warn('Checkbox element for "I hereby declare the information provided is true..." not found.');
        }
    } else {
        console.warn('Label element for "I hereby declare the information provided is true..." not found.');
    }
} catch (error) {
    console.error('Error occurred while setting checkbox:', error);
}

// gather the fields and their values
const fields = {
    'GPA (Undergraduate)': '3.9 out of 4.0',
    'GPA (Graduate)': '3.9 out of 4.0',
    'GPA (Doctorate)': 'Not applicable',
    'SAT Score': '1590 out of 1600',
    'ACT Score': '35 out of 36',
    'GRE Score': 'Not applicable',
    'GMAT Score': 'Not applicable',
    'SpaceX Employment History': 'I have never worked for SpaceX',
    'How many years of professional work experience do you have?': '8',
    'Are within a commutable distance or willing to relocate?': 'Yes',
    'Are you within a commutable distance or willing to relocate?': 'Yes',
    'Active Security Clearance(s)': 'Do not wish to disclose',
    'How did you hear about this job?': 'I am in the industry',
    'Are you legally authorized to work in the United States?': 'I am authorized to work in the United States for any employer',
    'Citizenship Status': '(a) U.S. citizen or national of the United States',
    'Do you meet all of the Basic Qualifications listed for this job?': 'Yes',
};

// fill in the fields
for (const [labelText, optionText] of Object.entries(fields)) {
    try {
        const labels = Array.from(document.getElementsByTagName('label'));
        const targetLabel = labels.find(label => label.textContent.includes(labelText));
        if (targetLabel) {
            const select = targetLabel.querySelector('select[aria-required="true"]');
            if (select) {
                // single-select dropdowns
                const option = Array.from(select.options).find(o => o.textContent === optionText);
                if (option) {
                    select.value = option.value;
                } else {
                    console.warn(`Option "${optionText}" not found for field "${labelText}".`);
                }
            } else {
                // multi-select dropdowns
                const multiSelect = targetLabel.parentNode.querySelector('select[multiple="multiple"]');
                if (multiSelect) {
                    const option = Array.from(multiSelect.options).find(o => o.textContent === optionText);
                    if (option) {
                        option.selected = true;
                        // trigger the 'change' event for the multi-select dropdown
                        const event = new Event('change', { bubbles: true });
                        multiSelect.dispatchEvent(event);
                    } else {
                        console.warn(`Option "${optionText}" not found for field "${labelText}".`);
                    }
                } else {
                    console.warn(`Select element not found for field "${labelText}".`);
                }
            }
        } else {
            console.warn(`Label "${labelText}" not found.`);
        }
    } catch (error) {
        console.error(`Error processing field "${labelText}":`, error);
    }
}

// check the boxes for "I am willing to work in the following locations..."
const sectionLabel_1 = Array.from(document.getElementsByTagName('label')).find(label => label.textContent.includes('Which location(s) are you interested in?'));
const sectionLabel_2 = Array.from(document.getElementsByTagName('label')).find(label => label.textContent.includes('Which location are you interested in?'));
const sectionLabel = sectionLabel_1 || sectionLabel_2;
if (sectionLabel) {
    const checkboxes = Array.from(sectionLabel.parentNode.getElementsByTagName('input'));
    for (const checkbox of checkboxes) {
        if (checkbox.type === 'checkbox') {
            checkbox.checked = true;
        }
    }
} else {
    console.warn(`Section label "Which location(s) are you interested in?" not found.`);
}

// submit the application
setTimeout(() => document.getElementById('submit_app').click(), 500);