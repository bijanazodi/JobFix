let userProfileData = null; // Store user profile in memory

// Listen for messages from popup.js or content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "saveProfile") {
        console.log("✅ Background received profile data:", message.data);
        userProfileData = message.data; // Save in memory
        chrome.storage.local.set({ userProfile: userProfileData }, () => {
            console.log("✅ Profile data saved to storage.local");
        });
        sendResponse({ status: "success" });
    }

    if (message.action === "getProfile") {
        chrome.storage.local.get("userProfile", (data) => {
            if (data.userProfile) {
                console.log("✅ Background sent profile data from storage:", data.userProfile);
                sendResponse({ status: "success", data: data.userProfile });
            } else {
                console.warn("⚠️ No stored profile data found.");
                sendResponse({ status: "error", message: "No profile data found" });
            }
        });
        return true; // Required for async response
    }

    return true; // Keep the message port open for async responses
});
