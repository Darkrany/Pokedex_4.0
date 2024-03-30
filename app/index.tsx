import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { getPokemon } from '@/api/pokeapi';
import { useInfiniteQuery } from "@tanstack/react-query";

interface Pokemon {
  name: string;
  url: string;
}

const PokedexList = () => {
  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: getPokemon,
    initialPageParam: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20',
    getNextPageParam: (lastPage) => lastPage.next,
  });

  const onFetchNextPageHandler = () => {
    fetchNextPage()
  }

 

  if (isLoading && !data) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  const renderPokemon = ({ item }: { item: Pokemon }) => {
    const pkID = item.url.split("/")[6];
    return (
      <Link href={`/(pokemon)/${pkID}`} key={pkID} asChild>
        <TouchableOpacity>
          <View style={styles.item}>
            <Image
              style={styles.preview}
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkID}.png`
              }}
            />
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    
    <View style={styles.container}>

      <FlatList
        data={data?.pages.flatMap(page => page.results)}
        renderItem={renderPokemon}
        keyExtractor={(item: Pokemon) => item.url}
        onEndReached={onFetchNextPageHandler}
        onEndReachedThreshold={0.5}
        numColumns={3} 
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search:{
    height: 35,
    marginRight: 12,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#e9e9e9',
    shadowColor: '#f6f6f6',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 5,
    borderRadius: 50,
  },
  flatListContent: {
    alignItems: 'center',
  },
  item: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    flex: 1, 
  },
  itemText: {
    fontSize: 18,
    textTransform: 'capitalize'
  },
  preview: {
    width: 100,
    height: 100
  }
})

export default PokedexList;
