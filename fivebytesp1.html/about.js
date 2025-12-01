// Set year automatically
document.getElementById("year").textContent = new Date().getFullYear();

// Team data
const team = [
    {name:"Shaimaa Saad", role:"Chef", img:"https://th.bing.com/th/id/OIP.8ZixVSVNqQwUEvotJekmeQHaFu?w=221&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"},
    {name:"Aliaa Belal Kamel", role:"Manager", img:"https://img.freepik.com/premium-photo/smiling-businessman-with-touchpad-standing-workplace-office_358354-12567.jpg"},
    {name:"Ola Ahmed Ibrahim", role:"Delivery", img:"https://eldiariony.com/wp-content/uploads/sites/2/2022/07/conductor-lanza-a-repartidor-de-comida-por-un-puente-tras-fuerte-discusion-vial-shutterstock_1706646727.jpg?w=1200"},
    {name:"Shahd Emad Bakr", role:"Customer Support", img:"https://www.datocms-assets.com/133532/1730072382-about-us-our-services.jpg"},
    {name:"Sherien Abdelhalim", role:"Call Center", img:"https://th.bing.com/th/id/OIP.D6JnTGSl2smtqEwwoggcTQHaFj?w=251&h=188&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"}
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
