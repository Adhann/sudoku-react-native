import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoard, setFetchBoard } from '../store/action';

import CountDown from 'react-native-countdown-component'
import { color } from 'react-native-reanimated';

export default function Board({navigation, route}) {
  // console.log(navigation, '<<< NAVIGATION');

  // const [board, setBoard] = useState([])
  // const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("");
  console.log(status, '<<<< STATUS');
  // const [cloneBoard, setCloneBoard] = useState([]);

  const dispatch = useDispatch()
  const { board } = useSelector((state) => state)
  const { loading } = useSelector((state) => state)
  const { cloneBoard } = useSelector((state) => state)

  useEffect(() => {
    dispatch(fetchBoard(route.params.difficulty))
  }, [])


  const input_to_board = (text, row_index, col_index) => {
    const inputValue = JSON.parse(JSON.stringify(board))
    inputValue[row_index][col_index] = +text
    dispatch(setFetchBoard(inputValue))
  }

  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

  const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&')

  const statusGameUnsolved = () =>
  Alert.alert(
    "Unsolved",
    "Unsolved",
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  )

  const statusGameSolved = () =>
  Alert.alert(
    "Solved",
    "Solved",
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  )

  function solveSudoku() {
    const data = { board };
    fetch("https://sugoku.herokuapp.com/solve", {
      method: "POST",
      body: encodeParams(data),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => response.json())
      .then((response) => {
        // setBoard(response.solution, '<<<<<<< REPONSE');
        dispatch(setFetchBoard(response.solution))
        console.log(board, '<<<<< BOARD')
      })
      .catch(console.warn)
  }

  function validateSudoku() {
    const data = {board}
    // console.log(data, '<<<<<<<< DATA BOARD')
    fetch("https://sugoku.herokuapp.com/validate", {
      method: "POST",
      body: encodeParams(data),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => response.json())
      .then((response) => {
        if(response.status === "unsolved") { 
          statusGameUnsolved()
          setStatus(response.status);
        } else if(response.status === "solved") {
          statusGameSolved()
          setStatus(response.status);
        } 
        console.log(response.status, '<<<<<<<< DARI VALIDATE');
      })
      .catch(console.warn);
  }

  return (
    <View style={styles.container}>
      <CountDown
        until={600}
        onFinish={() => { alert("YOUR TIME IS UP! TRY AGAIN!"), navigation.navigate("Home") }}
        size={20}
        running={(status === "solved") ? false : true}
        timeToShow={['M', 'S']}
        timeLabels={{m: 'MM', s: 'SS'}}
      />
      <Text style={{color: 'white'}}>Name : {route.params.name}</Text>
      <Text style={{color: 'white', marginBottom: 5}}>Difficulty : {route.params.difficulty}</Text>
      {/* <Text>{JSON.stringify(board)}</Text> */}
      { loading ? (
        <Text>Loading ... </Text>
      ) : (
        // <Text>GAMENYA LOAD</Text>

        board.map((row, row_index) => {
          return (
            <View key={row_index} style={{ flexDirection: "row"}}>
              {/* <Text>{row_index}</Text> */}
              {
                row.map((col, col_index) => {
                  // if (col == 0) col = ""
                  return (
                    <View key={col_index}>
                      <TextInput
                        style={cloneBoard[row_index][col_index] === 0 ? styles.input : styles.textSelected}
                        keyboardType={"numeric"}
                        value={col === 0 ? "" : col.toString()}
                        // value={col.toString()}
                        maxLength={1}
                        // editable={col === 0 ? true : false}
                        editable={cloneBoard[row_index][col_index] === 0 ? true : false}
                        onChangeText={(text)  => input_to_board(text, row_index, col_index)}
                      />
                    </View>
                  )
                })
              }
            </View>
          )
        })
      )}
      <View style={{ marginTop: 10}}>
        <Button title="solve" onPress={() => solveSudoku()} />
      </View>
      {
        (status == 'solved') ? (
          <View style={{ marginTop: 10, color: 'red'}}>
              <TouchableOpacity
                style={styles.buttonSolved}
                onPress={() => navigation.navigate('Finish', { name: route.params.name })}>
                <Text>Submit</Text>
              </TouchableOpacity>
            {/* <Button style={{backgroundColor: '#28a74'}} color='black' title="Submit" onPress={() => navigation.navigate('Finish', { name: route.params.name })} /> */}
          </View>
        ) : (
          // <View style={{ marginTop: 10, color: 'red'}}>
          //   <Button style={{backgroundColor: '#28a74'}} title="validate" onPress={() => validateSudoku()} />
          // </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              style={styles.buttonValidate}
              onPress={() => validateSudoku()}>
              <Text>Validate</Text>
            </TouchableOpacity>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  textSelected: {
    margin: 0,
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: "solid",
    textAlign: "center",
    width: 30,
    height: 30,
    backgroundColor: '#b38000'
  },
  input: {
    margin: 0,
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: "solid",
    textAlign: "center",
    width: 30,
    height: 30,
    backgroundColor: '#fab913'
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSolved: {
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
    backgroundColor:'#28a745',
  },
  buttonValidate: {
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
    backgroundColor:'#2196f3',
  }
});