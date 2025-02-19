// Open IndexedDB
function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("JobFixDB", 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("answers")) {
                db.createObjectStore("answers", { keyPath: "fieldName" });
            }
            console.log("IndexedDB: JobFixDB initialized.");
        };

        request.onsuccess = (event) => {
            console.log("IndexedDB: JobFixDB opened.");
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            console.error("IndexedDB Error:", event.target.error);
            reject(event.target.error);
        };
    });
}

// Store an answer in IndexedDB
async function storeAnswer(fieldName, value) {
    try {
        const db = await openDatabase();
        const transaction = db.transaction("answers", "readwrite");
        const store = transaction.objectStore("answers");
        store.put({ fieldName, value });

        console.log(`IndexedDB: Stored -> ${fieldName}: ${value}`);
    } catch (error) {
        console.error("IndexedDB Store Error:", error);
    }
}

// Retrieve an answer from IndexedDB
async function getAnswer(fieldName) {
    return new Promise(async (resolve) => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction("answers", "readonly");
            const store = transaction.objectStore("answers");
            const request = store.get(fieldName);

            request.onsuccess = () => {
                console.log(`IndexedDB: Retrieved -> ${fieldName}: ${request.result ? request.result.value : null}`);
                resolve(request.result ? request.result.value : null);
            };
            request.onerror = () => {
                console.error(`IndexedDB: Failed to retrieve ${fieldName}`);
                resolve(null);
            };
        } catch (error) {
            console.error("IndexedDB Retrieve Error:", error);
            resolve(null);
        }
    });
}
