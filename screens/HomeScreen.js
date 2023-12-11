import { View, Text, ScrollView } from 'react-native'
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
import { fetchUpcomingMovies } from '../api/api.js';
import { fetchPopularMovies } from '../api/api.js';
import { Dimensions } from 'react-native';
import { Image } from 'react-native';

var {width , height} = Dimensions.get('window');



export default function HomeScreen() {

  const [general, setGeneral] = useState("");
  const [upcoming, setUpcoming] = useState();
  const [popular, setPopular] = useState("");

  useEffect(() => {
    getGeneral();
    getUpcoming();
    getPopular();
    
  }

  , [])

  getGeneral = async () => {
    const response = await getMovies();
    setGeneral(response);
    console.log(response);
  }

  getUpcoming = async () => {
    const response = await fetchUpcomingMovies();
    if(response && response.results){
      setUpcoming(response);
    }
    
    console.log(response);
  }

  getPopular = async () => {
    const response = await fetchPopularMovies();
    
    setPopular(response);
    console.log(response);
  }







  return (
    <View className = "flex-1 bg-neutral-900  ">

        <SafeAreaView className = " z-10">
         <StatusBar style="light" />
        <View className = "flex-row justify-between items-center mx-4">
            <Bars3CenterLeftIcon size= "30" strokeWidth = {2} color = "#96a723" />
            <Text className = "text-white text-3xl font-bold ">cine <Text style={generalStyles.text} >world </Text></Text>
            <TouchableOpacity >
                <UserCircleIcon size= "33" strokeWidth = {2} color={"#96a723"}  />
            </TouchableOpacity>
        </View>
        </SafeAreaView>
        <ScrollView className = "flex-1">
            
            <LandscapeCarousel data={general} title={"On Cinemas"} />
      <Text className = "text-white text-3xl font-bold mx-4 pb-4">Upcoming</Text>
            <View className = "flex-row  items-center mx-4">
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                
                {upcoming && upcoming.results && upcoming.results.map((item) => {
                  return (
                    <View className = "flex-row " style={{width : width * 0.5 , borderRadius : 100  }}>
                    <TouchableOpacity onPress={() => navigation.navigate("MovieDetail", {item})} style ={{borderRadius : 100}}>
                    <View>
                    <Image
                    source={{uri : "https://image.tmdb.org/t/p/w1280" + item.poster_path}}
                    style={{width: width * 0.40 , height: height * 0.25 }}
                    className = "rounded-3xl"
                    />
                    <View className = "flex-row items-center justify-start" style={{width : width * 0.8}}>
                    <Text className = "text-white text-xl font-bold mx-2 mt-2">{item.title}</Text>
                    </View>
                    </View>
                    </TouchableOpacity>
                    </View>
                  )
                }
                )}
              
                

        </ScrollView>
        </View>
        
        <Text className = "text-white text-3xl font-bold mx-4 pb-4">Pre-Booking</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle= {{padding : 20}} >
        {popular && popular.results && popular.results.map((item) => {
                  return (
                   <View className = "flex-row " style={{width : 0.5 * width ,  borderRadius : 100  }}>
                    <TouchableOpacity onPress={() => navigation.navigate("MovieDetail", {item})} style ={{borderRadius : 100}}>
                    <View>
                    <Image
                    source={{uri : "https://image.tmdb.org/t/p/w1280" + item.poster_path}}
                    style={{width: width * 0.40 , height: height * 0.25 }}
                    className = "rounded-3xl"
                    />
                    <View className = "flex-row items-center justify-start" style={{width : width * 0.8}}>
                    <Text className = "text-white text-xl font-bold mx-2 mt-2">{item.title}</Text>
                    </View>
                    </View>
                    </TouchableOpacity>
                    </View>
                    
                  )
                }
                )}
        </ScrollView>
        

        </ScrollView>
    </View>
  )
}

