import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import FlipCard from 'react-native-flip-card';
import { Dimensions } from 'react-native';
import { ImageBackground } from 'react-native';
import InputButton from './NameInput';
import ExpiryInput from './ExpiryInput';
import CardNumberInput from './CardNumberInput';
import NameInput from './NameInput';
import EmailInput from './EmailInput';
import FullNameInput from './FullNameInput';
import PhoneInput from './PhoneInput';
import { useEffect } from 'react';

const {width , height} = Dimensions.get('window')

const CreditCard = () => {
  const [cardInfo, setCardInfo] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    console.log(cardInfo);
    console.log(userInfo);
    }, [cardInfo, userInfo]);

  // Update card information as user types
  const handleInputChange = (field, value) => {
    setCardInfo({ ...cardInfo, [field]: value });
  };
  const handleInputUserChange = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  }

  return (
    <View style={styles.container}>
      <FlipCard
        flipHorizontal
        flipVertical={false}
        flip={isFlipped}
        clickable={false}
        style={styles.card}
        className="shadow-md shadow-black"
        
      >
        {/* Front of the card */}
        <ImageBackground source={require('../assets/card.png')} style={[styles.cardFront, styles.card]}>
            <View className="flex-row justify-between items-center px-10 py-4">
            <View className="flex-col">
                <Text  className="-my-2 text-xs text-neutral-300 ">Card Number</Text>
          <Text style={styles.cardText} className="my-2">{cardInfo.number}</Text>
          <Text  className="-my-1 text-xs text-neutral-300 ">Full Name</Text>
          <Text style={styles.cardText} className="mt-1">{cardInfo.name}</Text>
          </View>
            <View className="flex-col items-end ">
            <Text  className=" text-xs text-neutral-300  ">Expires End</Text>
          <Text className ="pl-16"style={styles.cardText}>{cardInfo.expiry}</Text>
          </View>
            </View>
          </ImageBackground>

        {/* Back of the card */}
       
        <ImageBackground source={require('../assets/card-back.png')}style={[styles.card, styles.cardBack]}>
        <View style={styles.cardBackText} className=" self-end  ">
          <Text className="font-semibold" >CVV: {cardInfo.cvv}</Text>
          </View>
          
        </ImageBackground>

      </FlipCard>
<View className = "flex-col justify-between items-center px-10 py-4">
    <CardNumberInput placeholder="Card Number" field="number" handleInputChange={handleInputChange} />
    <NameInput placeholder="Name" field="name" handleInputChange={handleInputChange} />
    <View className = "flex-row justify-between items-center px-10 py-1">
    <ExpiryInput placeholder="Expiry Date" field="expiry" handleInputChange={handleInputChange}  />
    <View className = "flex-col  mx-2 mt-4 justify-center " style={{  height : height * 0.06 ,width : width * 0.45, backgroundColor : "#393939", borderRadius : 20}}   >
                <View className = "flex-row items-center  mx-5 justify-between " >
                <View>
                <TextInput 
        style={styles.input}
        placeholder="CVV" 
        placeholderTextColor="gray"
        keyboardType="numeric"
        maxLength={3}
        onFocus={() => setIsFlipped(true)} 
        onBlur={() => setIsFlipped(false)} 
        onChangeText={(text) => handleInputChange('cvv', text)} 
      />
      </View>
                </View>
               
                </View>
            </View>
            <FullNameInput placeholder="Full Name" field="name" handleInputUserChange={handleInputUserChange} />
            <EmailInput placeholder="Email" field="email" handleInputUserChange={handleInputUserChange} />
            <PhoneInput placeholder="Phone Number" field="phone" handleInputUserChange={handleInputUserChange} />
      
     
            </View>
   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: width * 0.98,
    height: height * 0.26,
    padding: 0,
    
    justifyContent: "flex-end",
  },
  cardFront: {
    
    borderRadius: 10,
  },
  cardBack: {
    
    borderRadius: 10,
  },
  cardText: {
    color: '#f4f4f4f4',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardBackText : {
    top : -100,
    right : 20,
    width : 70,
    
    
  },
  input: {
    height: 40,
    marginVertical: 10,
    color: 'white',
    fontWeight: 'bold',
    
    padding: 10,
    width: width ,
  },
});

export default CreditCard;
