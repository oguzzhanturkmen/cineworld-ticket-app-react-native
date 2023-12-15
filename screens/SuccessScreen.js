import { View, Text } from "react-native";
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
import { ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useEffect } from "react";
import { getSeatInfoByIds } from "../api/api";

var { width, height } = Dimensions.get("window");

export default function SuccessScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    item,
    theater,
    movie,
    time,
    adultNumber,
    studentNumber,
    childNumber,
    total,
    totalSeats,
    selectedSeatIds,
    userInfo,
  } = route.params;
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [day, setDay] = useState(0);
  const [monthName, setMonthName] = useState(0);
  const [year, setYear] = useState(0);
  const [seatData, setSeatData] = useState();

  useEffect(() => {
    if (time) {
      console.log(time);
      const date = new Date(time.dateTime);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const day = date.getDate();
      const monthName = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      setHours(hours);
      setMinutes(minutes);
      setDay(day);
      setMonthName(monthName);
      setYear(year);
    }
  }, [time]);
  useEffect(() => {
    const fetchSeatInfo = async () => {
      try {
        const data = await getSeatInfoByIds(selectedSeatIds);
        console.log(data);
        setSeatData(data);
      } catch (error) {
        console.error("Error fetching seat info:", error);
      }
    };

    console.log(selectedSeatIds);
    fetchSeatInfo();
    console.log(seatData);
  }, []);

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
            Ticket{" "}
          </Text>
          <TouchableOpacity>
            <View style={{ width: 28 }} />
          </TouchableOpacity>
        </View>
        <View
          className=" flex-col justify-between"
          style={{ height: height * 0.88 }}
        >
          <View>
            <View className="flex-row items-center justify-between mx-2 mt-4 py-2">
              <View
                style={{
                  width: width * 0.22,
                  height: height * 0.08,
                  backgroundColor: "#393939",
                  borderRadius: 10,
                }}
                className="items-center justify-center"
              >
                <View
                  className="items-center justify-center "
                  style={{
                    borderRadius: 50,
                    width: 30,
                    height: 30,
                    backgroundColor: "#96a723",
                  }}
                >
                  <Text className="text-white text-base font-bold ">1</Text>
                </View>
                <Text className="text-white text-xs  mx-2 font-bold   text-center justify-center mt-2">
                  Session
                </Text>
              </View>
              <View
                style={{
                  width: width * 0.22,
                  height: height * 0.08,
                  backgroundColor: "#393939",
                  borderRadius: 10,
                }}
                className="items-center justify-center"
              >
                <View
                  className="items-center justify-center "
                  style={{
                    borderRadius: 50,
                    width: 30,
                    height: 30,
                    backgroundColor: "#96a723",
                  }}
                >
                  <Text className="text-white text-base font-bold ">2</Text>
                </View>
                <Text className="text-white text-xs  mx-2  text-center font-bold  justify-center mt-2">
                  Ticket
                </Text>
              </View>
              <View
                style={{
                  width: width * 0.22,
                  height: height * 0.08,
                  backgroundColor: "#393939",
                  borderRadius: 10,
                }}
                className="items-center justify-center"
              >
                <View
                  className="items-center justify-center "
                  style={{
                    borderRadius: 50,
                    width: 30,
                    height: 30,
                    backgroundColor: "#96a723",
                  }}
                >
                  <Text className="text-white text-base font-bold ">3</Text>
                </View>
                <Text className="text-white text-xs  mx-2  text-center font-bold  justify-center mt-2">
                  Seat
                </Text>
              </View>
              <View
                style={{
                  width: width * 0.22,
                  height: height * 0.08,
                  backgroundColor: "#393939",
                  borderRadius: 10,
                }}
                className="items-center justify-center"
              >
                <View
                  className="items-center justify-center "
                  style={{
                    borderRadius: 50,
                    width: 30,
                    height: 30,
                    backgroundColor: "#96a723",
                  }}
                >
                  <Text className="text-white text-base font-bold ">4</Text>
                </View>
                <Text className="text-white text-xs  mx-2 font-bold  text-center justify-center mt-2">
                  Checkout
                </Text>
              </View>
            </View>
            <View className="flex-col  mx-3 ">
              <Text className="text-white text-sm font-bold mb-2">
                Ticket Created Succesfuly
              </Text>
              <Text className="text-neutral-300 text-xs ">
                You may take a screenshot of the ticket for validation.
              </Text>
            </View>
            <View
              className="flex-col  self-center  mx-2 mt-4 shadow-xl shadow-black"
              style={{
                width: width * 0.95,
                height: height * 0.62,
                backgroundColor: "white",
                borderRadius: 50,
                backgroundColor: "#b3b3b3",
                overflow: "hidden",
              }}
            >
              <View
                className="flex-col justify-end mx-6 "
                style={{ height: height * 0.42 }}
              >
                <Text className="text-3xl , text-neutral-200 font-extrabold ">
                  {movie.title}
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 2,
                  width: width,
                  borderStyle: "dashed",
                  borderHeight: 4,
                  position: "absolute",
                  top: height * 0.43,
                  borderColor: "#d9d9d9",
                  zIndex: 10,
                }}
              />
              <View className="flex-col   mx-4 mt-4 mb-2 p-3">
                <Text className="text-neutral-100 font-bold  text-base mb-1 ">
                  Fullname :<Text className="font-normal">{userInfo.name}</Text>{" "}
                </Text>
                <Text className="text-neutral-100 font-bold  text-base mb-1">
                  Theater : <Text className="font-normal">{theater.name}</Text>
                </Text>
                <Text className="text-neutral-100 font-bold  text-base mb-1">
                  Showtime :{" "}
                  <Text className="font-normal">
                    {day} {monthName}- {hours}.{minutes}
                  </Text>
                </Text>
                <Text className="text-neutral-100 font-bold  text-base mb-1">
                  Seats :
                  <Text>
                    {seatData?.map((seat) => {
                      return (
                        <Text className="text-neutral-100 font-bold  text-base mb-1">
                          {seat.rowChar}
                          {seat.seatNumber}{" "}
                        </Text>
                      );
                    })}
                  </Text>
                </Text>

                <Text className="text-neutral-100 font-bold  text-base ">
                  Total :<Text className="font-normal">$ {total}</Text>
                </Text>
              </View>

              <ImageBackground
                source={{
                  uri: "https://image.tmdb.org/t/p/w1280" + movie.poster_path,
                }}
                style={{
                  width,
                  height: height * 0.65,
                  opacity: 1,
                  justifySelf: "center",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: -11,
                }}
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(23,23,23,0.7)",
                  "rgba(54, 52, 52,1)",
                ]}
                style={{ width, height: height * 0.75 }}
                start={{ x: 0.3, y: 0.2 }}
                end={{ x: 0.3, y: 0.9 }}
                className="absolute bottom-0 -z-10 "
              />
            </View>
          </View>
          <TouchableOpacity
            className="flex-row justify-center items-end   mx-4 mb-6 p-3 mt-4"
            style={{ backgroundColor: "#96a723", borderRadius: 30, padding: 7 }}
            onPress={() => navigation.navigate("Home")}
          >
            <Text className="text-neutral-50 font-bold text-center text-base ">
              Finish Checkout
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
