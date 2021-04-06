import React, { useState } from 'react'
import { StyleSheet, Button, Picker, Text, View, TextInput, TouchableOpacity } from 'react-native'

export default function Home({ navigation }) {
  const [name, setName] = useState('');
  const [selectedValue, setSelectedValue] = useState("");
  

  const playGame = () => {
    if (!name) {
      alert('The Name field is required')
    } else if (!selectedValue) {
      alert('The Difficulty field is required')
    } else {
      navigation.navigate('Game', { difficulty: selectedValue, name })
      setName('')
      setSelectedValue('')
    }
  }
  return (
    <View style={styles.container}>
      <View style={{
          backgroundColor: "#3f964f",
          justifyContent: "center",
          alignItems: "center",
          width: 250,
          height: 100,
          borderRadius: 20,
          marginBottom: 80
        }}
      >

      <Text style={{color: 'white', padding: 10, fontSize: 30}}>Sudoku Game</Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>

        <TextInput
          style={{
            width: 250,
            marginBottom: 10,
            backgroundColor: 'white',
            padding: 7,
            borderRadius: 10,
            textAlign: 'center',
            justifyContent: 'center',
          }}
          value={name}
          placeholder='Input your name'
          onChangeText={(text) => setName(text)}
        ></TextInput>
        <View style={{backgroundColor: 'white', borderRadius:10,marginBottom: 20}}>

        <Picker
        selectedValue={selectedValue}
        style={{ padding: 7, width: 250 , borderRadius: 10}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Select Difficulty.." value="" />
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Hard" value="hard" />
        <Picker.Item label="Random" value="random" />
      </Picker>
        </View>
        <TouchableOpacity
            style={styles.button}
            color='#E7A22C'
            onPress={() => { playGame() }}>
            <Text>Play Game</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    textAlign: 'center',
    marginTop:10,
    marginBottom:10,
    padding: 15,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#fab913',
  }
});
