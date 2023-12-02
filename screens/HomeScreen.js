import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon , UserCircleIcon } from "react-native-heroicons/outline"
import { useEffect } from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { generalStyles} from '../style/style.js';
import { getMovies } from '../api/api.js';

import LandscapeCarousel from '../components/LandscapeCarousel.js';



export default function HomeScreen() {

  const [general, setGeneral] = useState("");

  useEffect(() => {
    getGeneral();
    
  }

  , [])

  getGeneral = async () => {
    const response = await getMovies();
    setGeneral(response);
    console.log(response);
  }




  return (
    <View className = "flex-1 bg-neutral-900  ">

        <SafeAreaView className = "mb-2 z-10">
         <StatusBar style="light" />
        <View className = "flex-row justify-between items-center mx-4">
            <Bars3CenterLeftIcon size= "30" strokeWidth = {2} color = "white" />
            <Text className = "text-white text-3xl font-bold ">cine <Text style={generalStyles.text} >world </Text></Text>
            <TouchableOpacity >
                <UserCircleIcon size= "33" strokeWidth = {2} color={"#9A3B3B"}  />
            </TouchableOpacity>
        </View>
        </SafeAreaView>
        <View className = "flex-1">
            
            <LandscapeCarousel data={general} title={"On Cinemas"} />

        </View>
        
    </View>
  )
}

