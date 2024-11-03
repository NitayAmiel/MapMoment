// moke data:

//import { OpenAI } from "openai"; // Ensure this is supported in the browser

// Initialize the map
const map = L.map('map').setView([32.0853, 34.7818], 10); // Coordinates for Tel Aviv
let chatGptMasaage = document.getElementById('messageBox');

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// On map click, fetch and display the location name
map.on('click', async function(e) {
    chatGptMasaage.innerHTML=""
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    
    // Fetch location name using a reverse geocoding service
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    const data = await response.json();
    
    const locationName = data.display_name || "Location not found";
    document.getElementById('locationName').textContent = locationName;
    
    console.log("Selected location:", locationName);
    getGuideByGPT(locationName);
    
});

// import {dataMok} from "./data";
const dataMok = {
    name: "הכותל המערבי",
    location: {
        city: "ירושלים",
        country: "ישראל",
        latitude: 31.7767,
        longitude: 35.2345
    },
    description: "הכותל המערבי, שריד בית המקדש השני, הוא אתר קדוש ליהודים מכל העולם. הכותל מהווה מקום לתפילה ולעלייה לרגל עבור מאמינים ותרמילאים, ומסמל את הקשר העמוק של העם היהודי לעיר ירושלים ולמורשתו העתיקה.",
    historicalFacts: [
        { year: -20, fact: "הכותל נבנה כחלק מבית המקדש השני על ידי המלך הורדוס במאה הראשונה לפני הספירה." },
        { year: 70, fact: "לאחר חורבן בית המקדש השני על ידי הרומאים, נותר הכותל שריד יחיד מקדושת המקום." },
        { year: 1967, fact: "במלחמת ששת הימים חזרה השליטה על הכותל המערבי לעם ישראל, ומאז הוא פתוח לקהל הרחב." }
    ],
    historicalStory: "סיפור מעניין הוא על אבן הכותל המכונה 'האבן הבוכיה'. לפי האגדה, בזמן חורבן בית המקדש השני, מלאך ניגש אל אחת מאבני הכותל ושאל אותה מדוע היא כה עצובה. האבן ענתה שהיא בוכה על חורבן ירושלים ועל הפירוד של עם ישראל. מאז, אבן זו נחשבת למקום קדוש ומיוחד בכותל, ולעיתים קרובות מאמינים מגיעים להניח עליה יד, להתפלל ולבקש בקשות אישיות.",
    tips: [
        "מומלץ להגיע בשעות הבוקר המוקדמות או בערב כדי ליהנות מהאווירה הייחודית ולחוות את המקום בשקט.",
        "יש אפשרות להכניס פתקים לחריצים בכותל - מסורת עתיקה של תפילה ובקשות.",
        "לבקר במנהרות הכותל המערבי - סיור מומלץ המספק מבט אל עבר ירושלים העתיקה והחפירות הארכיאולוגיות."
    ],
    images: [
        { url: "https://example.com/kotel_day.jpg", caption: "הכותל המערבי במהלך היום" },
        { url: "https://example.com/kotel_night.jpg", caption: "הכותל המערבי מואר בלילה" }
    ],
    nearbyAttractions: [
        { name: "מוזיאון מגדל דוד", distance: "0.8 ק\"מ" },
        { name: "הר הבית", distance: "0.5 ק\"מ" },
        { name: "שוק מחנה יהודה", distance: "2.5 ק\"מ" }
    ]
};

// Fetch guidelines from the backend server
async function getGuideByGPT(locationName) {
    const data = dataMok
    // console.log(data);
    chatGptMasaage.innerHTML=`<span id="messageDisplay">${data.description}</span>
                              <button onclick="closeMessageBox()">Close</button>
                                `
    const response = await fetch("http://localhost:3000/api/openai", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: `Write a guidelines description about ${locationName}`,
        }),
    });
    
    if (!response.ok) {
        console.error("Error fetching data from the server:", response.statusText);
        return;
    }
    // const data = await response.json(); **** I SHUT IT DOWN, PAY ATTENTION TO TURN IT ON!
}



function closeMessageBox() {
       chatGptMasaage.innerHTML=""
}