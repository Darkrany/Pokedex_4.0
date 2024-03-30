import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const Layout = () => {
    const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
  <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f4511e',
                
                },
                headerTintColor: '#fff',
            }} >
        <Stack.Screen name='index' options={{ title: 'Pokedex'}} />
        <Stack.Screen name="(pokemon)/[id]" options={{title: ''}} />
    </Stack>
    </QueryClientProvider>
)}

export default Layout