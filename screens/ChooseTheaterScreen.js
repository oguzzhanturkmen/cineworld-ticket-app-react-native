import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { ChevronLeftIcon, MagnifyingGlassCircleIcon } from "react-native-heroicons/outline"
import { TouchableOpacity } from 'react-native'
import { generalStyles } from '../style/style'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import { ArrowRightIcon } from "react-native-heroicons/outline"
import { ArrowDownIcon } from "react-native-heroicons/outline"
import { MagnifyingGlassIcon } from "react-native-heroicons/outline"
import { TextInput } from 'react-native'



import { Dimensions } from 'react-native'
const {width , height} = Dimensions.get('window')

export default function ChooseTheaterScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const {item} = route.params;


  return (
    <View className = "flex-1 bg-neutral-900 h-full ">

        <SafeAreaView className = "mb-2 z-10">
         <StatusBar style="light" />
        <View className = "flex-row justify-between items-center mx-1">
        <TouchableOpacity  className="rounded-xl  " onPress={() => navigation.goBack()}>
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="#96a723" />
            </TouchableOpacity>
            <Text className = "text-white text-xl font-bold " style={generalStyles.text} >Choose Theater </Text>
            <TouchableOpacity >
                <View  style={{width : 28 }}/>
            </TouchableOpacity>
            </View>
            <TouchableOpacity className = "flex-col  mx-2 mt-4 justify-center" style={{  height : height * 0.09 , backgroundColor : "#393939", borderRadius : 20}} onPress={() => navigation.navigate("ChooseTheater", {item})}  >
                <View className = "flex-row items-center  mx-5 justify-between " >
                    <View>
                <Text className = "text-white text-sm font-bold ">Choose City</Text>
                <Text className = "text-white text-sm  ">All</Text>
                </View>
                <ArrowDownIcon size= "30" strokeWidth = {2} color={"#96a723"}  />
                </View>
            </TouchableOpacity>
            <View className = "flex-col  mx-2 mt-4 justify-center" style={{  height : height * 0.09 , backgroundColor : "#393939", borderRadius : 20}} onPress={() => navigation.navigate("ChooseTheater", {item})}  >
                <View className = "flex-row items-center  mx-5 justify-between " >
                    <View>
                <TextInput className = "text-white text-sm font-bold "
                placeholder="Search for theaters"
                placeholderTextColor="gray"
                />
                
                </View>
                <MagnifyingGlassIcon size= "30" strokeWidth = {2} color={"#96a723"}  />
                </View>
            </View>
            <Text className = "text-white text-sm font-bold mx-4 mt-4 ">All Theaters</Text>
            <TouchableOpacity className = "flex-col  mx-2 mt-4 justify-center" style={{  height : height * 0.09 , backgroundColor : "#393939", borderRadius : 20}} onPress={() => navigation.navigate("ChooseTheater", {item})}  >
                <View className = "flex-row items-center  mx-5 justify-between " >
                    <View>
                <Text className = "text-white text-sm font-bold ">Theater Name</Text>
                <Text className = "text-white text-sm  ">Address</Text>
                </View>
                <ArrowRightIcon size= "30" strokeWidth = {2} color={"#96a723"}  />
                </View>
            </TouchableOpacity>
            </SafeAreaView>
            </View>
            
            
  )
}