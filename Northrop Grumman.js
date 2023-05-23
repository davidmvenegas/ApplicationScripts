// ---------------- Application Questions ---------------- //

let clickEvent = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
});

// select dropdown options
const dropdownOptions = [
    { labelText: "at least 18", optionText: "yes" },
    { labelText: "willing to relocate", optionText: "yes" },
    { labelText: "for purposes of complying with federal export control laws, please select one of the following", optionText: "a citizen of the u.s." },
    { labelText: "have you ever held a security clearance", optionText: "yes, current active clearance" },
    { labelText: "", optionText: "no" }  // default option
]

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

async function processElements() {
    const elements = Array.from(document.querySelectorAll('[data-automation-id="primaryQuestionnairePage"] div.css-7t35fz'));
    for (let element of elements) {
        // skip elements that aren't required
        if (!element.querySelector('abbr.requiredAsterisk')) {
            continue;
        }
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
    selectSecretCheckbox();
}

processElements();

// select "secret" checkbox
function selectSecretCheckbox() {
    try {
        document.querySelectorAll('label').forEach(label => {
            if (label.textContent.trim().toLowerCase() === "secret") {
                let input = document.getElementById(label.getAttribute('for'));
                if (input && input.type === "checkbox") {
                    input.click();
                }
            }
        });
    } catch (err) {
        console.warn('There was an issue selecting "secret" checkbox: ', err);
    }
    // next page
    setTimeout(() => document.querySelector('button[data-automation-id="bottom-navigation-next-button"]').click(), 500);
}