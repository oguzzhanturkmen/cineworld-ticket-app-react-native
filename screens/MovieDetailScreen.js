

import { View, Text, ScrollView, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/outline"
import { generalStyles } from '../style/style'
import { Image } from 'react-native'
import { Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'
import { fetchMovieDetails } from '../api/api'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'


var {width , height} = Dimensions.get('window');


export default function MovieDetailScreen() {
    const navigation = useNavigation();
    
    const route = useRoute();
    const {item} = route.params;
    const [movie, setMovie] = useState({});



    useEffect(() => {
        console.log("MovieDetailScreen");
        getMovieDetails(item.tmdbId)
    }
    , [])

    getMovieDetails = async (id) => {
        const data = await fetchMovieDetails(id);
        console.log(data);
        setMovie(data)
        
        
    }
  return (
    <>
    <ScrollView contentContainerStyle={{paddingBottom : 20}} className="flex-1 bg-neutral-900">
        <View className="w-full">
            <SafeAreaView className={"absolute z-20  w-full flex-row justify-between items-center  px-4 "}>
            <TouchableOpacity  className="rounded-xl p-1 " onPress={() => navigation.goBack()}>
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="#96a723" />
            </TouchableOpacity>
            <TouchableOpacity className="px-4" >
                <HeartIcon size= "35" color={"#96a723"}></HeartIcon>
            </TouchableOpacity>
            </SafeAreaView>
            <View >
            <ImageBackground
            source={{uri : "https://image.tmdb.org/t/p/w1280" + movie.backdrop_path}}
            style={{width, height: height * 0.65 , opacity:0.5, }}
            blurRadius={3}
            />
            <LinearGradient
            colors={["transparent" , "rgba(23,23,23,0.8)" , "rgba(23,23,23,1)"]}
            style={{width, height: height * 0.5 }}
            start={{x: 0.5 , y:0}}
            end={{x: 0.5 , y:1}}
            className="absolute bottom-0 "/>
            </View>
            {/*Movie Details*/}
        <View style={{marginTop : -(height * 0.52)}}>
            <View className="flex-row justify-center items-center" >
        <Image
            source={{uri : "https://image.tmdb.org/t/p/w1280" + movie.poster_path}}
            style={{width : width * 0.6, height: height * 0.4 , borderRadius : 20 , shadowColor: "#000", shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 , marginBottom : 30}}
            
            />
            </View>
           
        </View>
        {/*Movie Genres*/}
        
        <Text className="text-white text-center text-3xl font-bold tracking-wider">{movie.title}</Text>
        
            
        {/*Descriptipn */}
        <View className=" flex-row justify-center mx-4 space-x-3 mt-2 mb-4">

        {
              movie?.genres?.map((item , index) => {
                  return(
                    <View style={{backgroundColor :  '#96a723', borderRadius : 30 , padding : 7 }}>
                    <Text className="text-neutral-50 font-semibold text-center text-xs " >{item.name}</Text>
                    </View> )
              })
          }

        </View>
        <View className="flex-row justify-between ">
            <View className="flex-col justify-between ">
        <Text className="text-white font-bold text-sm mx-3 " > Release Date :  <Text className="text-neutral-400 font-semibold"> {movie?.release_date} </Text></Text>
        <Text className="text-white font-bold text-sm mx-3 " > Duration :  <Text className="text-neutral-400 font-semibold"> {movie?.runtime} minutes</Text> </Text>
        <Text className="text-white font-bold text-sm mx-3 " > Director : <Text className="text-neutral-400 font-semibold"> {item.director}</Text></Text>
      </View>
      
        <View className="items-center justify-center mx-5" style={{borderRadius : 40 ,  width : 60, height : 60 , borderWidth : 4 , borderColor : "#96a723"}}>
      <Text className="text-white font-semibold text-lg text-center">{movie?.vote_average?.toString().substring(0,3) }</Text>
      </View>
        </View>
      <View className="flex-col mt-2">
        <Text className="text-white font-bold text-sm mx-3 " > Overview  </Text>
        <Text className="text-white mx-4 font-semibold tracking-wide my-2 text-sm" style={{ lineHeight: 20 }}>{movie?.overview}</Text>
      </View>

      <TouchableOpacity className="flex-row justify-center items-center mx-4 mt-4 mb-2 p-3" style={{backgroundColor :  '#96a723', borderRadius : 30 , padding : 7 }} onPress={() => navigation.navigate("Checkout" , {movie, item})}>
        <Text className="text-neutral-50 font-bold text-center text-base " >Buy Ticket</Text>
        </TouchableOpacity>
        
        </View>

    </ScrollView>
    </>
  )
}