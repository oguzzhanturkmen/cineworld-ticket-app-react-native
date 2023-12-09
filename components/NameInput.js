import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { Dimensions } from 'react-native'
const {width , height} = Dimensions.get('window')
import { useState } from 'react'

export default function NameInput({handleInputChange }) {
   

    const handleNameChange = (text) => {
        
        handleInputChange('name', text); // Update parent state or perform other actions
    };


  return (
    
    
      <View className = "flex-col  mx-2 mt-4 justify-center " style={{  height : height * 0.06 ,width : width * 0.95, backgroundColor : "#393939", borderRadius : 20}}   >
                <View className = "flex-row items-center  mx-5 justify-between " >
                <View>
                <TextInput className = "text-white text-sm font-bold "
                placeholder={"Card Holder Name"}
                placeholderTextColor="gray"
                style={{width : width , height : height * 0.06}}
                maxLength={20}
                onChangeText={handleNameChange}
                />
                </View>
                </View>
            </View>
    
  )
}