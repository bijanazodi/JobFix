document.addEventListener("DOMContentLoaded", async () => {
    console.log("✅ Popup script loaded!");

    // Attach event listener to save button
    document.getElementById("save-profile").addEventListener("click", async () => {
        console.log("✅ Save Profile button clicked!");
        await saveProfileData();
    });

    // Load saved profile data on popup open
    await loadProfileData();
});

// **Save Profile Data to IndexedDB**
async function saveProfileData() {
    console.log("🔄 Saving profile data...");

    const profileData = {
        key: "profile",
        firstName: document.getElementById("first-name").value.trim(),
        lastName: document.getElementById("last-name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        address: document.getElementById("address").value.trim(),
        city: document.getElementById("city").value.trim(),
        state: document.getElementById("state").value.trim(),
        country: document.getElementById("country").value.trim(),
        zip: document.getElementById("zip").value.trim(),
    };

    console.log("🔹 Data to be saved:", profileData);

    // Send data to background script for storage
    chrome.runtime.sendMessage({ action: "saveProfile", data: profileData }, (response) => {
        if (response?.status === "success") {
            console.log("✅ Profile saved successfully.");
            alert("Profile saved!");
        } else {
            console.error("❌ Error saving profile.");
        }
    });
}

// **Load Profile Data from IndexedDB**
async function loadProfileData() {
    console.log("🔄 Loading profile data...");

    chrome.runtime.sendMessage({ action: "getProfile" }, (response) => {
        if (response?.status === "success" && response.data) {
            console.log("✅ Profile loaded:", response.data);

            // **Explicitly update First & Last Name fields**
            document.getElementById("first-name").value = response.data.firstName || "";
            document.getElementById("last-name").value = response.data.lastName || "";
            document.getElementById("email").value = response.data.email || "";
            document.getElementById("phone").value = response.data.phone || "";
            document.getElementById("address").value = response.data.address || "";
            document.getElementById("city").value = response.data.city || "";
            document.getElementById("state").value = response.data.state || "";
            document.getElementById("country").value = response.data.country || "";
            document.getElementById("zip").value = response.data.zip || "";
        } else {
            console.warn("⚠️ No profile found.");
        }
    });
}
