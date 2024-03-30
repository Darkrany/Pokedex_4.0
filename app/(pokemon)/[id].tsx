import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query';


const PokemonDetail = () => {
    const { id } = useLocalSearchParams <{ id: string}>();



  const {data, isLoading, error, isLoadingError, isFetching} = useQuery({
    queryKey: ['pokemon'],
    queryFn: async() => await fetch('https://pokeapi.co/api/v2/pokemon/'+id)
    .then((res) => res.json())
  })
  if (isLoading) {
    return <Text>Loading Pokemon details...</Text>;
  }

  if (error) {
    return <Text>Error fetching Pokemon details: {error.message}</Text>;
  }

  if (!data) {
    return <Text>No Pokemon found with ID: {id}</Text>;
  }
    return (
    <View>
      
      {/* <Text style={{ fontSize: 16 }}>{JSON.stringify(data, null, 2)}</Text> */}
      <Text>{data.types.map(type => type.type.name).join(", ")}</Text>
   
    </View>
  );
};

export default PokemonDetail


// const {data, isLoading, isLoadingError, isFetching} = useQuery({
//   queryKey: ['house'],
//   queryFn: () => getOneHouse(route.params.id),
// });
