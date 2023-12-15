import Carousel from "react-native-snap-carousel";
import { Dimensions, ImageBackground } from "react-native";
import { View, Text, TouchableWithoutFeedback, Platform } from "react-native";
import React from "react";

import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

var { width, height } = Dimensions.get("window");
const heightX = Platform.isPad ? height * 0.6 : height * 0.4;

export default function LandscapeCarousel({ data, title }) {
  const navigation = useNavigation();

  const handleClick = (item) => {
    console.log(item);
    navigation.navigate("MovieDetail", { item });
  };
  return (
    <View>
      <Text className="text-white text-3xl font-bold mx-4 pb-4">{title}</Text>

      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.1}
        sliderWidth={width}
        itemWidth={width * 0.8}
        enableMomentum={true}
        lockScrollWhileSnapping={true}
        autoplay={true}
        autoplayInterval={3000}
        loop={true}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <View
      className="flex-col items-center justify-center"
      style={{ width: width * 0.6, borderRadius: 100 }}
    >
      <TouchableWithoutFeedback
        onPress={() => handleClick(item)}
        style={{ borderRadius: 100 }}
      >
        <View>
          <Image
            source={{
              uri: "https://image.tmdb.org/t/p/w1280" + item.backdropUrl,
            }}
            style={{ width: width * 0.95, height: height * 0.25 }}
            className="rounded-3xl"
          />
          <View
            className="flex-row items-center justify-start"
            style={{ width: width * 0.8 }}
          >
            <Text className="text-white text-xl font-bold mx-2 mt-2">
              {item.title}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
