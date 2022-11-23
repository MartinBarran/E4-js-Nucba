//Traigo elementos de HTML y los almaceno en constantes. Declaro también la url de la api
const input = document.getElementById("input");
const form = document.getElementById("formulario");
const contenedor = document.getElementById("contenedor");
const baseURL = "https://pokeapi.co/api/v2/pokemon/";

//Variable que almacena el parseo del LS (o un array vacío)
let searchedPoke = JSON.parse(localStorage.getItem("Poke")) || [];


//Fc que llama a la api. Si todo va OK, guarda en LS la data que se trajo y ejecuta Fc renderPokemon().
//Si da error, lo notifica por consola y renderiza mensaje de "ID incorrecto"
async function callApi(searchedNum){
  try{
    const searchedURL = baseURL + searchedNum;
    const res = await fetch(searchedURL);
    const data = await res.json();
    localStorage.setItem('Poke', JSON.stringify(data));
    searchedPoke = JSON.parse(localStorage.getItem("Poke"))
    renderPokemon(data);
    form.reset()

  } catch(err){
    console.log(err)
    idIncorrecto();
    form.reset()
  }
};

//Mensajes de "error" y de "ingrese núm"
const ingreseId = ()=>{
  contenedor.innerHTML =  `<div><h2>Ingrese cualquier número para poder buscar su Pokemon.</h2></div>`
}
const idIncorrecto = ()=>{
  contenedor.innerHTML =  `<div><h2>No encontramos ningún Pokémon con dicho ID. Por favor, intente con otro.</h2></div>`
}  

//Fc que renderiza la data que se trajo de la API
function renderPokemon (data){
  contenedor.innerHTML =  `
  <div><h1>Tu pokémon se llama ${data.name.toUpperCase()}</h1>
  <h2>Es de tipo ${data.types.map((tipo) =>`<span>${tipo.type.name.toUpperCase()}</span>`).join(" ")}</h2>
  <p>Altura: ${data.height / 10}m</p>
  <p>Peso: ${data.weight / 10}Kg</p>
  <img src="${data.sprites.other.home.front_default}"></div>`
};

//Fc que se ejecuta al hacer clic. Si no había ningún dato en el input, ejecuta "ingreseId"
//Si recibió un número en el input, ejecuta la Fc "callApi"
const pokeDataTest = async (e) => {
  e.preventDefault();  
  const pokeId = input.value;
  if (!pokeId) {
      ingreseId();
      return;
  }else{
  callApi(Number(pokeId));
  
};
}

function init(){
  formulario.addEventListener("submit", pokeDataTest)
}

init()
