const inputSearch = document.getElementById('inputSearch');
const btnSearch = document.querySelector('button');
const changeMode = document.querySelector('.mode');

const countryName = document.getElementById('countryName');
const band = document.getElementById('band');
const capital = document.getElementById('capital');
const continent = document.getElementById('continent');
const population = document.getElementById('population');
const img = document.querySelector('img')

const iconMoon = document.querySelector('.feather-moon');
const iconSun = document.querySelector('.feather-sun');
const title = document.querySelector('.title');
const container = document.querySelector('.container')

btnSearch.addEventListener('click', () => {
    countryFound = inputSearch.value
    searchCountry(countryFound);
})

inputSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        searchCountry(inputSearch.value);
        inputSearch.value = ''
    }
})

changeMode.addEventListener('click', () => {
    iconMoon.classList.toggle('hidden');
    iconSun.classList.toggle('hidden');
    btnSearch.classList.toggle('dark');
    title.classList.toggle('dark')
    document.body.classList.toggle('dark');
    container.classList.toggle('dark')
})


const searchCountry = async (country) => {
    try {
        const reponse = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        const data = await reponse.json();

        countryName.innerHTML = `${data[0].name.nativeName.spa.official} <p id="band">${data[0].flag}</p>`;
        capital.innerHTML = `${data[0].capital[0]}`;
        continent.innerHTML = `${data[0].continents[0]}`;
        population.innerHTML = (`${data[0].population}`).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        img.src = `${data[0].flags.png}`;

        localStorage.setItem('country', country);

    } catch (error) {
        inputSearch.style.borderColor = 'red'
        setTimeout(()=> {
            inputSearch.style.borderColor = 'transparent'
        }, 2000);
        inputSearch.value = ''
        inputSearch.focus()
    }

}

const loadCountry = () => {
   const countrySaved =  localStorage.getItem('country');
   if(countrySaved){
    searchCountry(countrySaved)
   }
}

loadCountry();