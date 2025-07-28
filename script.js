const container = document.getElementById("countries-container");
const searchInput = document.getElementById("search");
const regionFilter = document.getElementById("region-filter");

let allCountries = [];

async function fetchCountries() {
  const res = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,currencies,languages");
  const data = await res.json();
  allCountries = data;
  displayCountries(data);
}

function displayCountries(countries) {
  container.innerHTML = "";

  countries.forEach(country => {
    const card = document.createElement("div");
    card.classList.add("country-card");

    card.innerHTML = `
      <img src="${country.flags.png}" alt="Flag of ${country.name.common}" />
      <h3>${country.name.common}</h3>
      <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Currency:</strong> ${getCurrencies(country)}</p>
      <p><strong>Languages:</strong> ${getLanguages(country)}</p>
    `;

    container.appendChild(card);
  });
}

function getCurrencies(country) {
  if (!country.currencies) return "Not Found";
  return Object.values(country.currencies).map(c => c.name).join(", ");
}

function getLanguages(country) {
  if (!country.languages) return "Not Found";
  return Object.values(country.languages).join(", ");
}

searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();
  const filtered = allCountries.filter(c =>
    c.name.common.toLowerCase().includes(searchText)
  );
  displayCountries(filtered);
});

regionFilter.addEventListener("change", () => {
  const region = regionFilter.value;
  const filtered = region
    ? allCountries.filter(c => c.region === region)
    : allCountries;
  displayCountries(filtered);
});

fetchCountries();
