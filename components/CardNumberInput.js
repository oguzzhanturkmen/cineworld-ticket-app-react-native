import React, { useState } from 'react';
import { View, TextInput, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const CardNumberInput = ({ handleInputChange }) => {
    const [cardNumber, setCardNumber] = useState('');

    const handleCardNumberChange = (text) => {
        
        const numericText = text.replace(/[^0-9]/g, '');

        
        const formattedText = numericText.replace(/(.{4})/g, '$1 ').trim();

        setCardNumber(formattedText);
        handleInputChange('number', numericText); // Pass unformatted text
    };

    return (
        <View style={{ height: height * 0.06, width: width * 0.95, backgroundColor: "#393939", borderRadius: 20, marginTop: 16, marginHorizontal: 8, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20 }}>
                <TextInput
                    style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}
                    placeholder="Card Number"
                    onChangeText={handleCardNumberChange}
                    value={cardNumber} 
                    placeholderTextColor="gray"
                    keyboardType="numeric"
                    maxLength={19} 
                />
                
            </View>
        </View>
    );
};

export default CardNumberInput;
