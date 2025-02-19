console.log("✅ JobFix content script loaded!");

// Request profile data from background.js
async function getUserProfile() {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ action: "getProfile" }, (response) => {
            if (response?.status === "success" && response.data) {
                console.log("✅ Profile data received in content.js:", response.data);
                resolve(response.data);
            } else {
                console.warn("⚠️ No profile data received from background.");
                resolve(null);
            }
        });
    });
}

// **Field Mappings to Detect Input Fields**
const fieldMappings = {
    firstName: ["first_name", "firstname", "given-name"],
    lastName: ["last_name", "lastname", "surname", "family-name"],
    email: ["email", "email_address"],
    phone: ["phone", "phone_number", "mobile", "tel"],
    address: ["address", "addr1", "street", "billingAddress"],
    city: ["city", "town", "municipality"],
    zip: ["zip", "postal", "postcode", "postal_code"],
};

// **Dropdown mappings for state & country**
const dropdownMappings = {
    state: ["state", "region", "prov", "state_code", "billingState"],
    country: ["country", "nation", "billingCountry"],
};

// **Detect Text Inputs (First Name, Address, etc.)**
function detectField(input) {
    const inputName = input.name?.toLowerCase() || input.id?.toLowerCase() || "";
    const placeholder = input.placeholder?.toLowerCase() || "";
    const label = document.querySelector(`label[for="${input.id}"]`)?.innerText?.toLowerCase() || "";

    // **Ensure email is NOT detected as address**
    if (inputName.includes("email") || placeholder.includes("email") || label.includes("email")) {
        return "email";
    }

    for (const [profileKey, keywords] of Object.entries(fieldMappings)) {
        if (keywords.some((keyword) =>
            inputName.includes(keyword) ||
            placeholder.includes(keyword) ||
            label.includes(keyword)
        )) {
            return profileKey;
        }
    }
    return null;
}

// **Detect Dropdown Fields (State & Country)**
function detectDropdown(select) {
    const selectName = select.name?.toLowerCase() || select.id?.toLowerCase() || "";
    const label = document.querySelector(`label[for="${select.id}"]`)?.innerText?.toLowerCase() || "";

    for (const [profileKey, keywords] of Object.entries(dropdownMappings)) {
        if (keywords.some((keyword) => selectName.includes(keyword) || label.includes(keyword))) {
            return profileKey;
        }
    }
    return null;
}

// **Autofill Function for Text Inputs**
function autofillTextField(field, value) {
    field.focus();
    field.value = value;
    field.dispatchEvent(new Event("input", { bubbles: true }));
    field.dispatchEvent(new Event("change", { bubbles: true }));
    field.dispatchEvent(new Event("blur", { bubbles: true }));
    console.log(`✅ Autofilled: ${field.name || field.id} -> ${value}`);
}

// **Autofill Function for Dropdowns**
function autofillDropdown(select, value) {
    let matched = false;
    for (let option of select.options) {
        let optionValue = option.value.toLowerCase().trim();
        let optionText = option.innerText.toLowerCase().trim();

        if (optionValue === value.toLowerCase() || optionText === value.toLowerCase()) {
            select.value = option.value;
            select.dispatchEvent(new Event("change", { bubbles: true }));
            console.log(`✅ Selected ${value} in dropdown:`, select.name || select.id);
            matched = true;
            break;
        }
    }
    if (!matched) {
        console.warn(`⚠️ No matching option found for: ${value} in dropdown`, select.name || select.id);
    }
}

// **Main Autofill Function**
async function autofillProfileData() {
    console.log("🔄 Autofilling profile data...");

    const profile = await getUserProfile();
    if (!profile) {
        console.warn("⚠️ No profile data available for autofill.");
        return;
    }

    document.querySelectorAll("input, select, textarea").forEach((field) => {
        if (field.type === "file" || field.name?.includes("g-recaptcha")) {
            console.warn("⏭️ Skipping file or CAPTCHA field:", field.name || field.id);
            return;
        }

        const profileField = detectField(field);
        if (profileField && profile[profileField]) {
            autofillTextField(field, profile[profileField]);
            return;
        }

        const dropdownField = detectDropdown(field);
        if (dropdownField && profile[dropdownField]) {
            autofillDropdown(field, profile[dropdownField]);
            return;
        }
    });
}

// **Run Autofill When Page Loads**
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ JobFix is scanning for fields...");
    setTimeout(autofillProfileData, 1000);
});

// **Detect Dynamically Loaded Forms**
const observer = new MutationObserver(() => {
    console.log("🔄 Detected page changes, trying to autofill again...");
    setTimeout(autofillProfileData, 500);
});
observer.observe(document.body, { childList: true, subtree: true });
