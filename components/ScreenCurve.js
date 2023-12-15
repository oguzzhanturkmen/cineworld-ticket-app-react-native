import React from "react";
import { View, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";

const ScreenCurve = () => {
  const screenWidth = Dimensions.get("window").width;
  const curveWidth = screenWidth * 0.9;
  const curveHeight = 70;
  const startX = (screenWidth - curveWidth) / 2;

  return (
    <Svg
      height={curveHeight}
      width={screenWidth}
      viewBox={`0 0 ${screenWidth} ${curveHeight}`}
    >
      <Path
        d={`M${startX},${curveHeight - 10} Q${screenWidth / 2},${
          curveHeight / 2
        } ${startX + curveWidth},${curveHeight - 10}`}
        fill="none"
        stroke="white"
        strokeWidth="3"
      />
    </Svg>
  );
};

export default ScreenCurve;
