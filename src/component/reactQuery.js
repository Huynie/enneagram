import React from 'react'
import { View, Text } from 'react-native'
import { useQueryClient, useQuery } from 'react-query'
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase/config';
import { doc, getDoc } from "firebase/firestore/lite";

const ReactQuery = () => {
  const { isLoading, error, data } = useQuery('ditto', () => {
    let userData;
    onAuthStateChanged(auth, user => {
      console.log("state change user: ",user);
      userData = user;
      console.log('userData: ', userData)
    })
    return {data: userData};
  }
  );
  console.log(data)
  if (isLoading) return <Text>Loading...</Text>
  if (error) return (
    <View style={{paddingTop: 80}}>
      <Text>Error: {error.message}</Text>
    </View>
  )

  return (
      <View style={{paddingTop: 100}}>
        <Text>React Query Data:  {data.data}</Text>
      </View>
    // <QueryClientProvider client={queryClient}>
    // </QueryClientProvider>
  )
}

export default ReactQuery