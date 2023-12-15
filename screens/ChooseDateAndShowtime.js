import { View, Text, ScrollView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeftIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "react-native-heroicons/outline";
import { TouchableOpacity } from "react-native";
import { generalStyles } from "../style/style";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { useRoute } from "@react-navigation/native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useState } from "react";
import { useEffect } from "react";
import { getShowtimesByTheaterIdAndMovieId } from "../api/api";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { FlatList } from "react-native";

var { width, height } = Dimensions.get("window");

export default function ChooseDateAndShowtime() {
  const navigation = useNavigation();
  const route = useRoute();
  const { item, theater, movie } = route.params;
  const [showtimes, setShowtimes] = useState([]);
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [time, setTime] = useState(0);
  const [selectedTime, setSelectedTime] = useState(0);
  const [selectedShowtime, setSelectedShowtime] = useState(0);

  useEffect(() => {
    console.log("ChooseDateAndShowtime");
    console.log(theater.id);
    getShowtimes(theater.id);
  }, []);

  getShowtimes = async (theaterId) => {
    const data = await getShowtimesByTheaterIdAndMovieId(theaterId, item.id);
    console.log(data);

    setShowtimes(data);
    const days = [];
    data.forEach((showtime) => {
      const date = new Date(showtime.dateTime);
      const day = date.getDate();
      if (!days.includes(day)) {
        days.push(day);
      }
    });
    setDays(days);
  };
  const handleDaySelection = (day) => () => {
    setSelectedDay(day);
    const times = showtimes.filter((showtime) => {
      const date = new Date(showtime.dateTime);
      return date.getDate() === day;
    });
    setTime(times);
  };
  const handleTimeSelection = (time) => () => {
    setSelectedTime(time);
    showtimes.forEach((showtime) => {
      if (showtime.dateTime === time.dateTime) {
        setSelectedShowtime(showtime);
      }
    });

    navigation.navigate("Checkout", {
      item,
      theater,
      time,
      selectedDay,
      selectedTime,
      selectedShowtime,
      movie,
    });
  };
  const renderTimeItem = ({ item }) => {
    const isSelectedTime = item === selectedTime;
    const date = new Date(item.dateTime);
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return (
      <TouchableWithoutFeedback onPress={handleTimeSelection(item)}>
        <View
          style={{
            width: width * 0.45,
            height: height * 0.09,
            backgroundColor: isSelectedTime ? "#96a723" : "#393939",
            borderRadius: 10,
            borderWidth: 3,
            borderColor: isSelectedTime ? "#96a723" : "transparent",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 30,
            marginRight: 20
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            {hour < 10 ? `0${hour}` : hour}:
            {minutes < 10 ? `0${minutes}` : minutes}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View className="flex-1 bg-neutral-900 h-full ">
      <SafeAreaView className="mb-2 z-10">
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-1">
          <TouchableOpacity
            className="rounded-xl  "
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="#96a723" />
          </TouchableOpacity>
          <Text
            className="text-white text-xl font-bold "
            style={generalStyles.text}
          >
            Choose Date & Time{" "}
          </Text>
          <TouchableOpacity>
            <View style={{ width: 28 }} />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          horizontal={true}
        >
          {days.map((day) => {
            const isSelectedDay = day === selectedDay;
            // get name of the month and name of the day
            const dateObj = new Date();
            dateObj.setDate(day);
            const month = dateObj.toLocaleString("default", { month: "long" });
            const dayName = dateObj
              .toLocaleString("default", { weekday: "long" })
              .split(",")[0];

            return (
              <TouchableWithoutFeedback
                key={day} // Add a unique key for each item
                onPress={handleDaySelection(day)}
                className="flex-row items-center justify-between mx-2 mt-4 py-2"
              >
                <View
                  style={{
                    width: width * 0.4,
                    height: height * 0.12,
                    backgroundColor: "#393939", // Change background color when selected
                    borderRadius: 10,
                    borderWidth: isSelectedDay ? 2 : 0, // Thicker border when selected
                    borderColor: isSelectedDay ? "#96a723" : "", // White border when selected
                  }}
                  className="items-center justify-center"
                >
                  <Text className="text-white text-base font-bold ">
                    {month} {day}{" "}
                  </Text>
                  <Text className="text-white text-sm font-bold self-start mx-9">
                    {dayName}{" "}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: "row", width: width }}>
            {selectedDay !== 0 && (
              <FlatList
                data={time}
                renderItem={renderTimeItem}
                keyExtractor={(item) => item.dateTime}
                numColumns={2} // Adjust the number of columns for grid layout
                contentContainerStyle={{ paddingBottom: 20 }}
                style={{ width: width , marginHorizontal: 10}}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
