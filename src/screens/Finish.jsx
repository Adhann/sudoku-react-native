import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Finish({ route, navigation }) {
  const { name } = route.params;
  console.log(name, '<<<< NAME');
  let value;

  const [leaderBoard, setLeaderBoard] = useState([]);

  // const storeData = async (key, value) => {
  //   try {
  //     await AsyncStorage.setItem(key);
  //     console.log(name, '<<<<<<<<< KEY VALUE');
  //     setLeaderBoard(key);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const storeData = async (key, value) => {
    try {
      console.log(key, '<<<<<<<<< keyy');
      console.log(value, '<<<<<<<<< valuey');
      // const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, value);
      setLeaderBoard(key)
    } catch (e) {
      console.log(e);
    }
  };
  console.log(storeData, '<<<<<<<<<<<<<< STORE DATA');
  // const getMultiple = async () => {
  //   try {
  //     let keys = await AsyncStorage.getAllKeys();
  //     value = await AsyncStorage.multiGet(keys);
  //     setLeaderBoard(value);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    setLeaderBoard(name);
  }, []);
  // useEffect(() => {
  //   getMultiple();
  // }, []);

  // leaderBoard.sort((x, y) => +x[1] - +y[1]);

  console.log(leaderBoard, '<<<<<<<<<<< LEADERBOARD');
  return (
    <View style={styles.container}>
      {/* <Text>{JSON.stringify(leaderBoard)}</Text> */}
      {/* {
        leaderBoard.map((leaderBoard) => {
          return (
            <Text>111 </Text>
          )
        })
      } */}
      <Text style={{color: 'white', fontSize: 20}}> Congratulations {name}, You win !!</Text>
      <View style={{ marginTop: 10, color: 'red'}}>
        <Button style={{backgroundColor: '#28a74'}} title="Play Again" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});