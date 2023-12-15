import { View, Text, ScrollView } from "react-native";
import React from "react";
import CreditCard from "../components/CreditCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { generalStyles } from "../style/style";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { postPaymentData, saveBooking } from "../api/api";

const { width, height } = Dimensions.get("window");

export default function PaymentScreen() {
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
  } = route.params;
  const [cardInfo, setCardInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [paymentResponse, setPaymentResponse] = useState({});

  useEffect(() => {
    console.log("PaymentScreen");
    console.log(item.id);
    console.log(theater.id);
    console.log(movie.id);
    console.log(time.showtimeId);
    console.log(adultNumber);
    console.log(studentNumber);
    console.log(childNumber);
    console.log(total);
    console.log(totalSeats);
    console.log(selectedSeatIds);
  }, []);

  const handleCardInfo = (cardInfo) => {
    setCardInfo(cardInfo);
  };
  const handleUserInfo = (userInfo) => {
    setUserInfo(userInfo);
  };

  const handleFinishBuying = async () => {
    postBody = {
      paymentDetail: {
        cardNumber: cardInfo.number,
        cardHolderName: cardInfo.name,
        expiryDate: "12/25",
        cvv: cardInfo.cvv,
      },
      user: {
        fullName: userInfo.name,
        email: userInfo.email,
        phoneNumber: userInfo.phone,
      },
    };

    try {
      const paymentResponse = await postPaymentData(postBody);

      console.log("Payment Response:", paymentResponse);

      const bookingBody = {
        totalPrice: total,
        userId: paymentResponse.userId,
        paymentDetailId: paymentResponse.paymentDetailId,
        showTimeId: time.showtimeId,
        seats: selectedSeatIds.map((seatId) => ({ seatId: seatId })),
      };

      const bookingResponse = await saveBooking(bookingBody);

      console.log("Booking Response:", bookingResponse);
    } catch (error) {
      console.error("Error:", error);
    }

    navigation.navigate("Success", {
      item,
      theater,
      time,
      adultNumber,
      studentNumber,
      childNumber,
      total,
      totalSeats,
      selectedSeatIds,
      movie,
      userInfo,
    });
  };
  useEffect(() => {}, [paymentResponse]);

  return (
    <View className="flex-1 bg-neutral-900 h-full ">
      <SafeAreaView className=" z-10">
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
            Payment
          </Text>
          <TouchableOpacity>
            <View style={{ width: 28 }} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="flex-1 bg-neutral-900"
      >
        <View className="flex-1">
          <CreditCard
            handleCardInfo={handleCardInfo}
            handleUserInfo={handleUserInfo}
          />
          <TouchableOpacity
            className="flex-row justify-center items-center mx-4 mt-4 mb-2 p-3"
            style={{ backgroundColor: "#96a723", borderRadius: 30, padding: 7 }}
            onPress={handleFinishBuying}
          >
            <Text className="text-neutral-50 font-bold text-center text-base ">
              Finish Buying
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
