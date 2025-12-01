// Set year automatically
document.getElementById("year").textContent = new Date().getFullYear();

// Team data
const team = [
    {name:"Shaimaa Saad", role:"Chef", img:"https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=500&q=80"},
    {name:"Aliaa Belal Kamel", role:"Management", img:"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=80"},
    {name:"Ola Ahmed Ibrahim", role:"Delivery", img:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80"},
    {name:"Shahd Emad Bakr", role:"Customer Support", img:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80"}
];

const box = document.querySelector(".team-cards");

team.forEach(member => {
    const card = document.createElement("div");
    card.className = "team-card";
    card.innerHTML = `
        <img src="${member.img}" alt="${member.name}">
        <h4>${member.name}</h4>
        <p>${member.role}</p>
    `;
    card.addEventListener("click", () => {
        alert(`Hello! ${member.name} from the Five Bites team 😊`);
    });
    box.appendChild(card);
});