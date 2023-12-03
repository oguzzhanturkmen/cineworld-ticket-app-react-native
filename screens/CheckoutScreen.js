import { View, Text, ImageBackground , Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, CheckCircleIcon, ArrowRightIcon } from "react-native-heroicons/outline"
import { TouchableOpacity } from 'react-native';
import { generalStyles } from '../style/style';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

var {width , height} = Dimensions.get('window');

export default function CheckoutScreen() {
    const navigation = useNavigation();

  return (
    <View className = "flex-1 bg-neutral-900 h-full ">

        <SafeAreaView className = "mb-2 z-10">
         <StatusBar style="light" />
        <View className = "flex-row justify-between items-center mx-1">
        <TouchableOpacity  className="rounded-xl  " onPress={() => navigation.goBack()}>
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="#96a723" />
            </TouchableOpacity>
            <Text className = "text-white text-xl font-bold " style={generalStyles.text} >Choose Session </Text>
            <TouchableOpacity >
                <View  style={{width : 28 }}/>
            </TouchableOpacity>
            </View>
            <View className = " flex-col justify-between" style={{height : height * 0.88}}>
                <View>
            <View className = "flex-row items-center justify-between mx-2 mt-4 py-2" >
                <View style={{width : width * 0.22 , height : height * 0.08, backgroundColor : "#393939" , borderRadius : 10}} className ="items-center justify-center">
                <View className="items-center justify-center " style={{borderRadius : 50 ,  width : 30, height : 30 , borderWidth : 3 , borderColor : "#96a723"}}>
                <Text className = "text-white text-base font-bold ">1</Text>
                </View>
                <Text className = "text-white text-xs  mx-2 font-bold   text-center justify-center mt-2">Session</Text>
                </View>
                <View style={{width : width * 0.22 , height : height * 0.08, backgroundColor : "#393939" , borderRadius : 10}} className ="items-center justify-center">
                <View className="items-center justify-center " style={{borderRadius : 50 ,  width : 30, height : 30 , borderWidth : 1 , borderColor : "white"}}>
                <Text className = "text-white text-base font-bold ">2</Text>
                </View>
                <Text className = "text-white text-xs  mx-2  text-center font-bold  justify-center mt-2">Ticket</Text>
                </View>
                <View style={{width : width * 0.22 , height : height * 0.08, backgroundColor : "#393939" , borderRadius : 10}} className ="items-center justify-center">
                <View className="items-center justify-center " style={{borderRadius : 50 ,  width : 30, height : 30 , borderWidth : 1 , borderColor : "white"}}>
                <Text className = "text-white text-base font-bold ">3</Text>
                </View>
                <Text className = "text-white text-xs  mx-2  text-center font-bold  justify-center mt-2">Seat</Text>
                </View>
                <View style={{width : width * 0.22 , height : height * 0.08, backgroundColor : "#393939" , borderRadius : 10}} className ="items-center justify-center">
                <View className="items-center justify-center " style={{borderRadius : 50 ,  width : 30, height : 30 , borderWidth : 1 , borderColor : "white"}}>
                <Text className = "text-white text-base font-bold ">4</Text>
                </View>
                <Text className = "text-white text-xs  mx-2 font-bold  text-center justify-center mt-2">Checkout</Text>
                </View>
        </View>
        <View className = "flex-col  mx-3 " >
            <Text className = "text-white text-sm font-bold mb-2">Choose Session</Text>
            <Text className = "text-neutral-300 text-xs ">You must choose the movie you want to watch, the theater and the session. After that, you can select a ticket.</Text>
        </View>
        <View className = "flex-col  mx-2 mt-4 justify-between" >
            <View className = "flex-row items-center shadow-lg  shadow-neutral-900" style={{backgroundColor : "#393939", borderRadius : 20,   height : height * 0.06 , zIndex : 2}} >
                <View className = "flex-row items-center  mx-5 justify-between " >
                <CheckCircleIcon size= "30" strokeWidth = {2} color={"#96a723"}  />
            <Text className = "text-white text-sm font-bold mx-2">Choose Movie</Text>
            </View>
            </View>
            <View className = "flex-row items-center justify-between -mt-8" style={{  height : height * 0.3 , backgroundColor : "gray", borderRadius : 20}} >
                
                <ImageBackground
                source={{uri : "https://www.napoleon.movie/images/share.jpg"}}
                style={{ height : height * 0.3 , width : width * 0.963 ,position: 'absolute', left: 0, top: 0 , zIndex:-1}}
                imageStyle={{ borderRadius: 20}}
                blurRadius={20}>
                </ImageBackground>
                <View className = "flex-row" >
                <Image
                 source={{uri : "https://image.tmdb.org/t/p/w1280" + "/jE5o7y9K6pZtWNNMEw3IdpHuncR.jpg"}}
                 style={{width : width * 0.4, height: height * 0.25 , borderRadius : 20 , }}
                 className="self-center mt-8 ml-2"
            
            />
                <View className = "flex-col  mt-8 ml-4" >
                <Text className = "text-white text-xl font-bold ">Napoleon</Text>
                <Text className = "text-white text-xs font-bold mt-3 ">Action, Adventure, Drama</Text>
                <Text className = "text-white text-xs font-bold mt-1">192 min</Text>
                <Text className = "text-white text-xs font-bold mt-1">Director : Ridley Scott</Text>
                </View>
                </View>
            </View>
            </View>

              <View className = "flex-col  mx-2 mt-4 justify-center" style={{  height : height * 0.07 , backgroundColor : "#393939", borderRadius : 20}}>
                <View className = "flex-row items-center  mx-5 justify-between " >
                <Text className = "text-white text-sm font-bold ">Choose Theater</Text>
                <ArrowRightIcon size= "30" strokeWidth = {2} color={"#96a723"}  />
            </View>
            </View>
            <View className = "flex-col  mx-2 mt-4 justify-center" style={{  height : height * 0.07 , backgroundColor : "#393939", borderRadius : 20}}>
                <View className = "flex-row items-center  mx-5 justify-between " >
                <Text className = "text-white text-sm font-bold ">Pick Date and Session</Text>
                <ArrowRightIcon size= "30" strokeWidth = {2} color={"#96a723"}  />
            </View>
        </View>
        </View>
        <TouchableOpacity className="flex-row justify-center  mx-4 mt-4 mb-2 p-3" style={{backgroundColor :  '#96a723', borderRadius : 30 , padding : 7 }}>
        <Text className="text-neutral-50 font-bold text-center text-base " >Buy Ticket</Text>
        </TouchableOpacity>
        </View>
        </SafeAreaView>
        </View>
  )
}