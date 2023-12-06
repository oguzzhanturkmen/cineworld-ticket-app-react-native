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
    const [selectedSeatIds, setSelectedSeatIds] = useState([]);

    useEffect(() => {
        console.log(selectedSeatIds)    
    }, [selectedSeatIds])

    const toggleSeat = (seatId) => {
        const newSeats = {...seats};
        let seatCount = selectedSeatCount;
        let newSelectedSeatIds = [...selectedSeatIds];

        for (const row in newSeats) {
            newSeats[row] = newSeats[row].map(seat => {
                if (seat.id === seatId) {
                    if (seat.status === 'available' && seatCount < totalSeats) {
                        seatCount++;
                        newSelectedSeatIds.push(seat.id);
                        return { ...seat, status: 'selected' };
                    } else if (seat.status === 'selected') {
                        seatCount--;
                        newSelectedSeatIds = newSelectedSeatIds.filter(id => id !== seat.id);
                        return { ...seat, status: 'available' };
                    }
                }
                return seat;
            });
        }

        setSeats(newSeats);
        setSelectedSeatCount(seatCount);
        setSelectedSeatIds(newSelectedSeatIds);
    };

    const navigation = useNavigation();
    const route = useRoute();
    const {item, theater, movie, time,  adultNumber, studentNumber, childNumber, total, totalSeats} = route.params;
    const [selectedSeatCount, setSelectedSeatCount] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [day, setDay] = useState(0);
    const [monthName, setMonthName] = useState(0);
    const [year, setYear] = useState(0);


    useEffect(() => {

        if(time){
            const date = new Date(time.dateTime);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const day = date.getDate();
            const monthName = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
            setHours(hours);
            setMinutes(minutes);
            setDay(day);
            setMonthName(monthName);
            setYear(year);
        }

        
    }
    , [time])

  return (
    
    <View className="flex-1 bg-neutral-900 h-full">
        <SafeAreaView className={"absolute z-20  w-full flex-row justify-between items-center  px-4 "}>
            
            <TouchableOpacity  className="rounded-xl p-1 " onPress={() => navigation.goBack()}>
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="#96a723" />
            </TouchableOpacity>
            <Text className = "text-white text-xl font-bold " style={generalStyles.text} >Choose Seat </Text>
            <TouchableOpacity className="" >
               <View style={{width : 28 }}/>
            </TouchableOpacity>
        </SafeAreaView>
        <View className="flex-1">
        <View className="w-full -z-10 absolute ">
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
        <View className="flex-row mx-6" style={{top: height * 0.13}}>
        <Image source={{uri : "https://image.tmdb.org/t/p/w1280" + movie.poster_path}} style={{width : width * 0.3, height: height * 0.2 , borderRadius : 20 , shadowColor: "#000", shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 , marginBottom : 30}}/>
            <View className="flex-col   mx-6">
            <Text className = "text-white text-2xl font-bold ">{movie?.title}</Text>
            <Text className = "text-white text-lg font-bold ">{theater.name}</Text>
            <Text className = "text-white text-lg font-bold ">{day} {monthName} {year}</Text>
            <Text className = "text-white text-lg font-bold ">{hours < 10 ? "0" + hours : hours}:{minutes <10 ? minutes + "0" : minutes}</Text>
            </View>
            
            
        </View>
        <View  style={{top: height * 0.12}}>
        <View   >
            <View className="flex-col  items-center">
            <Text className = "text-white text-2xl font-bold -mb-10 ">Screen</Text>
            <View className="flex-row justify-center items-center mb-6">
            <ScreenCurve />
            </View>
            <View style={styles.container}>
            {/* Render seats */}
            
            {Object.keys(seats).map(row => (
                <View key={row} style={styles.row}>
                    <Text style={styles.rowLabel}>{row}</Text>
                    {seats[row].map(seat => (
                        <Seat key={seat.id} seat={seat} onToggle={toggleSeat} />
                    ))}
                </View>
                
            ))}
            
            
           
            
            <View className="flex-row  justify-center top-2">
            <View style={{backgroundColor : "gray", width : 20 , height : 20 , borderRadius : 50}}></View>
            <Text className = "text-white text-xs mx-2 -mb-10 ">Available</Text>
            <View style={{backgroundColor : "green", width : 20 , height : 20 , borderRadius : 50}}></View>
            <Text className = "text-white text-xs mx-2 -mb-10 ">Selected</Text>
            <View style={{backgroundColor : "red", width : 20 , height : 20 , borderRadius : 50}}></View>
            <Text className = "text-white text-xs mx-2 -mb-10 ">Reserved</Text>
            </View>

        </View>
            </View>
        </View>   
        </View>   
        </View>
        <TouchableOpacity className="flex-row justify-center items-end   mx-4 mb-6 p-3" style={{backgroundColor :  '#96a723', borderRadius : 30 , padding : 7 }} onPress={() => navigation.navigate("ChooseTicket", {item, time, hours, minutes, day, movie, monthName, theater})}>
        <Text className="text-neutral-50 font-bold text-center text-base " >Buy Ticket</Text>
        </TouchableOpacity>
        </View>

        
    
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        
        marginTop : 5,
        marginBottom : 20,
        
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent : "center",
        marginBottom: 40,
    },
    seat: {
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 9,
        borderRadius: 5,
    },
    seatText: {
        color: 'white',
    },
});