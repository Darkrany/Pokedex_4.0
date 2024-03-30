



export const getPokemon = async ({ pageParam = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20" }) => {

    const res = await fetch(pageParam);
    return res.json();

};

