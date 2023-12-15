import React, { useState } from "react";
import { View, TextInput, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const ExpiryInput = ({ handleInputChange }) => {
  const [expiry, setExpiry] = useState("");

  const handleExpiryChange = (text) => {
    // Automatically add a slash after MM
    let formattedText = text;
    if (formattedText.length === 2 && expiry.length === 1) {
      // User is adding second digit
      formattedText += "/";
    } else if (formattedText.length === 2 && expiry.length === 3) {
      // User is deleting slash
      formattedText = formattedText.substring(0, 1);
    }

    setExpiry(formattedText);
    handleInputChange("expiry", formattedText);
  };

  return (
    <View
      style={{
        height: height * 0.06,
        width: width * 0.46,
        backgroundColor: "#393939",
        borderRadius: 20,
        marginTop: 16,
        marginHorizontal: 8,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <TextInput
          style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
          placeholder="Expiry (MM/YY)"
          onChangeText={handleExpiryChange}
          value={expiry}
          placeholderTextColor="gray"
          keyboardType="numeric"
          maxLength={5}
        />
      </View>
    </View>
  );
};

export default ExpiryInput;
