import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, CheckCircleIcon, ArrowRightIcon, FilmIcon, UserCircleIcon, ArrowDownCircleIcon, ArrowUpCircleIcon } from "react-native-heroicons/outline"
import { TouchableOpacity } from 'react-native';
import { generalStyles } from '../style/style';
import { useNavigation } from '@react-navigation/native';


import { Dimensions } from 'react-native';

var {width , height} = Dimensions.get('window');


export default function ChooseTheaterScreen() {
    const navigation = useNavigation();
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
            
            <View className = "flex-row items-center justify-between mx-2 mt-4 py-2" >
                <View style={{width : width * 0.22 , height : height * 0.08, backgroundColor : "#393939" , borderRadius : 10}} className ="items-center justify-center">
                <View className="items-center justify-center " style={{borderRadius : 50 ,  width : 30, height : 30 ,   backgroundColor : "#96a723" }}>
                <Text className = "text-white text-base font-bold ">1</Text>
                </View>
                <Text className = "text-white text-xs  mx-2 font-bold   text-center justify-center mt-2">Session</Text>
                </View>
                <View style={{width : width * 0.22 , height : height * 0.08, backgroundColor : "#393939" , borderRadius : 10}} className ="items-center justify-center">
                <View className="items-center justify-center " style={{borderRadius : 50 ,  width : 30, height : 30 , borderWidth : 3 , borderColor : "#96a723"}}>
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
        <View style={{height : height}} >
        <ScrollView contentContainerStyle={{paddingBottom : 20}} className="flex-1 ">
        <View className = "flex-col  mx-3 " >
            <Text className = "text-white text-sm font-bold mb-2">Choose Ticket</Text>
            <Text className = "text-neutral-300 text-xs ">You must choose the movie you want to watch, the theater and the session. After that, you can select a ticket.</Text>
        </View>
        <View className = "flex-col  mt-4 justify-between mx-2" >
            <View className = "flex-row justify-between items-center mb-4" style={{height : height * 0.12, backgroundColor : "#393939", borderRadius : 20}}>
                <View className = "flex-row justify-start items-center" >
                <UserCircleIcon size= "60" strokeWidth = {2} color={"#96a723"} style={{marginLeft : 15}}  />
                <Text className = "text-white text-xl font-bold mx-2">Adult  |</Text>
                <Text className = "text-white text-xl font-bold ">$ 10.00 </Text>
                </View>
                <View className = "flex-row justify-center items-center" >
                    <Text className = "text-white text-3xl font-bold mx-2">1</Text>
                    <View className = "flex-col justify-center items-center mx-4" >
                    <TouchableOpacity className="mb-3">
                    <ArrowUpCircleIcon size= "45" strokeWidth = {2} color={"#96a723"} style={{marginLeft : 15}}  />
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <ArrowDownCircleIcon size= "45" strokeWidth = {2} color={"#96a723"} style={{marginLeft : 15}}  />
                    </TouchableOpacity>
                    </View>
                    </View>

            </View>
            <View className = "flex-row justify-between items-center mb-4" style={{height : height * 0.12, backgroundColor : "#393939", borderRadius : 20}}>
                <View className = "flex-row justify-start items-center" >
                <UserCircleIcon size= "60" strokeWidth = {2} color={"#96a723"} style={{marginLeft : 15}}  />
                <Text className = "text-white text-xl font-bold mx-2">Student  |</Text>
                <Text className = "text-white text-xl font-bold ">$ 8.00 </Text>
                </View>
                <View className = "flex-row justify-center items-center" >
                    <Text className = "text-white text-3xl font-bold mx-2">1</Text>
                    <View className = "flex-col justify-center items-center mx-4" >
                    <TouchableOpacity className="mb-3">
                    <ArrowUpCircleIcon size= "45" strokeWidth = {2} color={"#96a723"} style={{marginLeft : 15}}  />
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <ArrowDownCircleIcon size= "45" strokeWidth = {2} color={"#96a723"} style={{marginLeft : 15}}  />
                    </TouchableOpacity>
                    </View>
                    </View>

            </View>
            <View className = "flex-row justify-between items-center mb-4" style={{height : height * 0.12, backgroundColor : "#393939", borderRadius : 20}}>
                <View className = "flex-row justify-start items-center" >
                <UserCircleIcon size= "60" strokeWidth = {2} color={"#96a723"} style={{marginLeft : 15}}  />
                <Text className = "text-white text-xl font-bold mx-2">Child  |</Text>
                <Text className = "text-white text-xl font-bold ">$ 8.00 </Text>
                </View>
                <View className = "flex-row justify-center items-center" >
                    <Text className = "text-white text-3xl font-bold mx-2">1</Text>
                    <View className = "flex-col justify-center items-center mx-4" >
                    <TouchableOpacity className="mb-3">
                    <ArrowUpCircleIcon size= "45" strokeWidth = {2} color={"#96a723"} style={{marginLeft : 15}}  />
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <ArrowDownCircleIcon size= "45" strokeWidth = {2} color={"#96a723"} style={{marginLeft : 15}}  />
                    </TouchableOpacity>
                    </View>
                    </View>

            </View>
            </View>

            </ScrollView>
            </View>

        </SafeAreaView>
            </View>
            
  )
}