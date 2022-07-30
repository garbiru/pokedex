const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");

const form = document.querySelector(".form")
const input = document.querySelector(".input__search")
const buttonPrev = document.querySelector(".btn-prev")
const buttonNext = document.querySelector(".btn-next")

let pokeIndex = 1

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if(APIResponse.status === 200){
        const data = await APIResponse.json()
        return data;
    }

}

const renderPokemon = async (pokemon) => {
    pokemonNumber.innerHTML = '';
    pokemonName.innerHTML = 'Loading...';
    
    const data = await fetchPokemon(pokemon);
    
    if(data){
        pokemonImage.style.display = "block";
        pokeIndex = data.id;
        pokemonNumber.innerHTML = data.id;
        pokemonName.innerHTML = data.name;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        
        input.value = '';
    }else{
        pokemonNumber.innerHTML = '';
        pokemonName.innerHTML = '404 not found';
        pokemonImage.style.display = "none";
    }
   
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if(pokeIndex > 1){
        pokeIndex--;
        renderPokemon(pokeIndex);
    }

});

buttonNext.addEventListener('click', () => {
    pokeIndex++;
    renderPokemon(pokeIndex);
});

renderPokemon(pokeIndex);