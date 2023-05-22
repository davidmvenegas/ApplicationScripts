// ---------------- Application Questions 1 of 2 ---------------- //

let clickEvent = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
});

// enter "NA" in all textareas
Array.from(document.querySelectorAll("textarea")).forEach(textarea => {
    textarea.value = "NA";
    textarea.dispatchEvent(new Event('focusout', { bubbles: true }));
});

// select "No" for all "Are you Boeing related" questions
try {
    let buttons = document.querySelectorAll('button[aria-haspopup="listbox"]');
    buttons.forEach(button => {
        button.dispatchEvent(clickEvent);
        document.querySelectorAll('li[role="option"]').forEach(li => {
            if (li.textContent.trim().toLowerCase() === "no") {
                li.dispatchEvent(clickEvent);
            }
        });
    });
} catch (err) {
    console.warn('There was an issue selecting "No" for "Are you Boeing related" questions: ', err);
}

// select all "None of the Above." checkboxes
try {
    document.querySelectorAll('label').forEach(label => {
        if (label.textContent.trim().toLowerCase() === "none of the above.") {
            let input = document.getElementById(label.getAttribute('for'));
            if (input && input.type === "checkbox") {
                input.click();
            }
        }
    });
} catch (err) {
    console.warn('There was an issue selecting "None of the Above." checkboxes: ', err);
}

// next page
setTimeout(() => document.querySelector('button[data-automation-id="bottom-navigation-next-button"]').click(), 500);


// ---------------- Application Questions 2 of 2 ---------------- //


setTimeout(() => {
    const dropdownOptions = [
        { labelText: "many years of", optionText: "more than 10 years" },
        { labelText: "years experience", optionText: "more than 10 years" },
        { labelText: "years of experience", optionText: "more than 10 years" },
        { labelText: "security clearance", optionText: "secret" },
        { labelText: "do you have the ability to obtain a", optionText: "yes" },
        { labelText: "", optionText: "yes" }  // default option
    ]

    async function processElements() {
        const elements = Array.from(document.querySelectorAll('[data-automation-id="secondaryQuestionnairePage"] div.css-7t35fz'));
        for (let element of elements) {
            let labelText = element.querySelector('label')?.textContent.trim().toLowerCase();
            if (labelText) {
                let selectedOption;
                for (let option of dropdownOptions) {
                    if (labelText.includes(option.labelText.toLowerCase())) {
                        selectedOption = option;
                        break;
                    }
                }
                selectedOption = selectedOption || dropdownOptions[dropdownOptions.length - 1];  // default to yes if no match found
                await clickOption(element.querySelector('button'), selectedOption.optionText.toLowerCase());
            }
        }
    }

    async function clickOption(button, optionText) {
        button.dispatchEvent(clickEvent);
        await new Promise(resolve => setTimeout(resolve, 250));
        let option = Array.from(document.querySelectorAll('div.wd-popup li[role="option"]'))
            .find(option => option.textContent.trim().toLowerCase() === optionText);
        if (option) {
            option.dispatchEvent(clickEvent);
            await new Promise(resolve => setTimeout(resolve, 250));
            document.body.dispatchEvent(clickEvent);
        } else {
            console.warn('Option not found');
        }
    }

    processElements();
}, 4000);


// ---------------- Allow Data ---------------- //


try {
    let buttons = document.querySelectorAll('.WBN0');
    console.log('buttons: ', buttons)

    buttons.forEach(button => {
        button.dispatchEvent(clickEvent);
        document.querySelectorAll('div[role="option"]').forEach(li => {
            if (li.textContent.trim().toLowerCase() === "yes") {
                li.dispatchEvent(clickEvent);
            }
        });
    });
} catch (err) {
    console.warn('There was an issue selecting "Yes" for allow data questions: ', err);
}

// submit
setTimeout(() => document.querySelector('button[data-uxi-actionbutton-action="bpf-submit"]').click(), 500);