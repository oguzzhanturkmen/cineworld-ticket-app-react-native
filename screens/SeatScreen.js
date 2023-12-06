import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView } from 'react-native-safe-area-context';

import { TouchableOpacity } from 'react-native';
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/outline"
import { Image } from 'react-native';
import { ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { getSeatsByShowtimeId } from '../api/api';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

import { generalStyles } from '../style/style';
import ScreenCurve from '../components/ScreenCurve';

const generateMockSeats = () => {
    const initialSeats = [];
const rows = ['A', 'B', 'C', 'D', 'E' , 'F' , 'G' , 'H' , 'I' , 'J'];
const seatsPerRow = 10;

rows.forEach(row => {
    for (let i = 1; i <= seatsPerRow; i++) {
        initialSeats.push({
            id: `${row}${i}`,
            row: row,
            number: i,
            status: Math.random() < 0.1 ? 'reserved' : 'available', // 10% chance of being reserved
        });
    }
});
return initialSeats;
};


const groupSeatsByRow = (seats) => {
    return seats.reduce((acc, seat) => {
        acc[seat.row] = acc[seat.row] || [];
        acc[seat.row].push(seat);
        return acc;
    }, {});
};

const initialSeats = generateMockSeats();
const groupedSeats = groupSeatsByRow(initialSeats);

const Seat = ({ seat, onToggle }) => {
    let backgroundColor;
    let onPress;

    switch(seat.status) {
        case 'selected':
            backgroundColor = 'green';
            onPress = () => onToggle(seat.id);
            break;
        case 'reserved':
            backgroundColor = 'red';
            onPress = null; // Disable onPress for reserved seats
            break;
        default:
            backgroundColor = 'grey';
            onPress = () => onToggle(seat.id);
    }

    return (
        <TouchableOpacity
            style={[styles.seat, { backgroundColor }]}
            onPress={onPress}
            disabled={seat.status === 'reserved'} // Disable touch for reserved seats
        >
            <Text style={styles.seatText}>{seat.row}{seat.number}</Text>
        </TouchableOpacity>
    );
};



const {width , height} = Dimensions.get('window')

export default function SeatScreen() {

    const [seats, setSeats] = useState(groupedSeats);

    const toggleSeat = (seatId) => {
        const newSeats = {...seats};
        for (const row in newSeats) {
            newSeats[row] = newSeats[row].map(seat => {
                if (seat.id === seatId) {
                    return {
                        ...seat,
                        status: seat.status === 'selected' ? 'available' : 'selected',
                    };
                }
                return seat;
            });
        }
        setSeats(newSeats);
    };

    const navigation = useNavigation();
    const route = useRoute();
    const {item, theater, movie, showtime} = route.params;
    
    
    const [selectedSeats, setSelectedSeats] = useState([10][8]);
    const [total, setTotal] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isDisabled2, setIsDisabled2] = useState(false);
    const [isDisabled3, setIsDisabled3] = useState(false);

  return (
    
    <View className="flex-1 bg-neutral-900">
        <SafeAreaView className={"absolute z-20  w-full flex-row justify-between items-center  px-4 "}>
            
            <TouchableOpacity  className="rounded-xl p-1 " onPress={() => navigation.goBack()}>
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="#96a723" />
            </TouchableOpacity>
            <Text className = "text-white text-xl font-bold " style={generalStyles.text} >Choose Seat </Text>
            <TouchableOpacity className="" >
                <HeartIcon size= "35" color={"#96a723"}></HeartIcon>
            </TouchableOpacity>
        </SafeAreaView>
        <View className="w-full absolute -z-1">
            <ImageBackground
            source={{uri : "https://image.tmdb.org/t/p/w1280" + movie.backdrop_path}}
            style={{width, height: height * 0.65 , opacity:0.5, }}
            blurRadius={0}
            />
            <LinearGradient
            colors={["transparent" , "rgba(23,23,23,0.8)" , "rgba(23,23,23,1)"]}
            style={{width, height: height * 0.5 }}
            start={{x: 0.5 , y:0}}
            end={{x: 0.5 , y:1}}
            className="absolute bottom-0 "/>
        </View>
        <View className="flex-col" style={{top: height * 0.1}}>
            <View className="flex-col  items-center mt-4">
            <Text className = "text-white text-2xl font-bold ">{movie?.title}</Text>
            <Text className = "text-white text-lg font-bold ">{theater.name}</Text>
            <Text className = "text-white text-lg font-bold ">{"a"}</Text>
            </View>
        </View>
        <View className="flex-col" style={{top: height * 0.22}}>
        <View  className="flex-col" style={{top: 0}}>
            <View className="flex-col  items-center">
            <Text className = "text-white text-2xl font-bold -mb-10 ">Screen</Text>
            <View className="flex-row justify-center items-center mb-6">
            <ScreenCurve />
            </View>
            <View style={styles.container}>
            {/* Render seats */}
            <View style={styles.container}>
            {Object.keys(seats).map(row => (
                <View key={row} style={styles.row}>
                    <Text style={styles.rowLabel}>{row}</Text>
                    {seats[row].map(seat => (
                        <Seat key={seat.id} seat={seat} onToggle={toggleSeat} />
                    ))}
                </View>
                
            ))}
            <View className="flex-row top-12" >
            <View className="flex-row  items-center">
            <View className="w-6 h-6 bg-green-700"/>
            <Text className = "text-white text-lg font-bold ">Available</Text>
            </View>
            <View className="flex-row  items-center">
            <View className="w-6 h-6 bg-red-700"/>
            <Text className = "text-white text-lg font-bold ">Reserved</Text>
            </View>
            <View className="flex-row  items-center">
            <View className="w-6 h-6 bg-gray-700"/>
            <Text className = "text-white text-lg font-bold ">Selected</Text>
            </View>
            </View>
        </View>
        </View>
            </View>
        </View>   
       
        
        </View>   
        
        </View>

        
    
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop : 140,
        marginBottom : 20,
        
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
        
        marginBottom: 40,
    },
    seat: {
        width: 28,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
        borderRadius: 5,
    },
    seatText: {
        color: 'white',
    },
});