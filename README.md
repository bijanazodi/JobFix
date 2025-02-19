# 🚀 JobFix - Smart Job Application Autofill

**JobFix** is a **browser extension** that **automatically detects and fills job applications** using stored user data.  
It helps job seekers save time by **reusing previously entered information** and **intelligently selecting the right fields**.

## **📌 Features**
✅ **Job Application Form Detection**  
- Scans web pages for job application forms  
- Identifies standard fields (Name, Email, Work Experience, Education, etc.)  
- Matches detected fields with stored user information  

✅ **Smart Autofill**  
- Automatically fills job application fields with saved user data  
- Supports **first name, last name, email, phone, address, city, zip code, state, and country**  
- Handles dropdown selections for **state and country**  

✅ **Secure Data Storage**  
- Stores user profile information **locally using IndexedDB**  
- **AES encryption** for added security  
- No data is sent to external servers  

✅ **Easy Profile Management**  
- Users can **manually enter and edit their information** in the popup UI  
- Profile data persists across browser sessions  

✅ **Dynamically Detects & Updates Fields**  
- Uses a **MutationObserver** to detect changes in job application pages  
- Autofills newly loaded elements dynamically  

---

## **📂 Project Structure**
JobFix/ │── icons/ # Icons for the extension │── popup/ # Popup UI files │ ├── popup.html # Profile management UI │ ├── popup.js # Handles user data storage │ ├── popup.css # Styles for the popup UI │── manifest.json # Chrome extension manifest (v3) │── content.js # Handles form detection & autofill │── background.js # Manages background processes │── README.md # Project documentation

yaml
Copy
Edit

---

## **🛠 Tech Stack**
| **Component**       | **Technology**                      |
|----------------------|----------------------------------|
| **Browser Extension** | Chrome Extensions API (Manifest v3) |
| **Frontend UI**      | HTML, JavaScript, CSS (Popup UI) |
| **Data Storage**     | IndexedDB (local)               |
| **Autofill Logic**   | JavaScript (Content Scripts, DOM Manipulation) |
| **Security**         | AES Encryption for stored data  |

---

## **🛠 Installation & Setup**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/jobfix-extension.git
cd jobfix-extension
2️⃣ Load the Extension in Chrome
Open Google Chrome and navigate to:
chrome://extensions/
Enable "Developer Mode" (toggle in the top-right corner).
Click "Load Unpacked" and select the JobFix folder.
The JobFix extension will appear in the extensions list.
📌 Usage Guide
1️⃣ Open the Profile Manager
Click on the JobFix extension icon in the browser toolbar.
Enter your First Name, Last Name, Email, Phone, Address, City, State, Country, and ZIP Code.
Click "Save Profile".
2️⃣ Visit a Job Application Website
Navigate to a job application form (e.g., Greenhouse, Workday, LinkedIn, Indeed).
The extension will detect form fields and autofill them with your stored data.
If any field is incorrect, edit it manually in the application.
3️⃣ Autofill Dynamic Fields
If a field does not autofill, reload the page or refresh the extension.
The extension continuously monitors for new fields and updates dynamically.
🔒 Security & Privacy
🔐 100% Local Storage: JobFix never sends data to external servers.
🔏 AES Encryption: User data is secured with encryption.
🛡️ No Tracking: No analytics, no trackers, no user monitoring.
🚀 Contributing
We welcome contributions! Here's how you can help:

Fork the repo and create a new branch.
Make your changes and commit them.
Submit a pull request (PR) with a clear description.
We'll review and merge contributions that improve the project.
🐛 Reporting Issues
Found a bug or need a new feature? Submit an issue:

Go to the Issues tab on GitHub.
Describe the problem clearly (screenshots help!).
We'll respond and work on a fix.
📜 License
This project is licensed under the MIT License.
Feel free to use, modify, and distribute it with attribution.

👤 Author
Your Name: Bijan Azodi

⭐ Support the Project
If you find this extension useful, consider starring the repo ⭐ and sharing it with others! 😊

Happy job hunting! 🚀🎯



