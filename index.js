const stationsContainer = document.getElementById('stations-container');
const searchInput = document.getElementById('search-input');
const brandFilter = document.getElementById('brand-filter');
const toggleThemeBtn = document.getElementById('toggle-theme');

let stations = [];

fetch("http://localhost:3000/stations")
  .then(res => res.json())
  .then(data => {
    stations = data;
    populateBrandFilter();
    renderStations(stations);
  });

function populateBrandFilter() {
  const brands = [...new Set(stations.map(station => station.brand))];
  brands.forEach(brand => {
    const option = document.createElement("option");
    option.value = brand;
    option.textContent = brand;
    brandFilter.appendChild(option);
  });
}

function renderStations(data) {
  stationsContainer.innerHTML = "";
  data.forEach(station => {
    const card = document.createElement("div");
    card.className = "station-card";

    card.innerHTML = `
      <h3>${station.name}</h3>
      <p><strong>Location:</strong> ${station.location}</p>
      <p><strong>Brand:</strong> ${station.brand}</p>
      <p><strong>Fuel Types:</strong> ${station.fuelTypes.join(", ")}</p>
      <p><strong>Prices:</strong> ${Object.entries(station.pricePerLitre)
        .map(([type, price]) => `${type}: KES ${price.toFixed(2)}`).join(", ")}</p>
      <p><strong>Services:</strong> ${station.services.length ? station.services.join(", ") : "None"}</p>
    `;

    stationsContainer.appendChild(card);
  });
}

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const filtered = stations.filter(station =>
    station.name.toLowerCase().includes(value) ||
    station.location.toLowerCase().includes(value)
  );
  renderStations(filtered);
});

brandFilter.addEventListener("change", () => {
  const value = brandFilter.value;
  const filtered = value
    ? stations.filter(station => station.brand === value)
    : stations;
  renderStations(filtered);
});

toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
