import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { set } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoard, setFetchBoard } from '../store/action';

export default function Board({difficulty}) {
  // console.log(navigation, '<<< NAVIGATION');
  console.log(difficulty, '<<< DIFICULTY');

  // const [board, setBoard] = useState([])
  // const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("");
  console.log(status, '<<<< STATUS');
  const [cloneBoard, setCloneBoard] = useState([]);

  const dispatch = useDispatch()
  const { board } = useSelector((state) => state)
  const { loading } = useSelector((state) => state)
  // console.log(board, "<<<<<<<<<<<< BOARD");
  // console.log(loading, "<<<<<<<<<<<< loading");

  // useEffect(() => {
  //   setLoading(true)
  //   fetch('https://sugoku.herokuapp.com/board?difficulty=easy')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setBoard(data.board)
  //       setInitBoard(data.board)
  //       setLoading(false)
  //     })
  //     .catch((err) => {
  //       console.log(err, '<<<');
  //     })
  // }, [])

  useEffect(() => {
    dispatch(fetchBoard(difficulty))
    // setCloneBoard(board)
  }, [])

  useEffect(() => {
    console.log(cloneBoard, '<<<< CLONE BOARD');
    setCloneBoard(board)
  }, [board])

  const input_to_board = (text, row_index, col_index) => {
    const inputValue = JSON.parse(JSON.stringify(board));
    // const inputValue = [...board];
    inputValue[row_index][col_index] = +text;
    // setBoard(inputValue)
    dispatch(setFetchBoard(inputValue))
    setCloneBoard(inputValue)
    // console.log(inputValue, '<<<<< INPUT VALUE');
    // console.log(board, '<<<<< BOARD VALUE');
    console.log(text, row_index, col_index);
  }

  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

  const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

  const statusGameUnsolved = () =>
  Alert.alert(
    "Unsolved",
    "Unsolved",
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  );

  const statusGameSolved = () =>
  Alert.alert(
    "Solved",
    "Solved",
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  );

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
      .catch(console.warn);
  }

  function validateSudoku() {
    const data = {board}
    console.log(data, '<<<<<<<< DATA BOARD');
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
        console.log(status, '<<<<<<<< STATUS');
      })
      .catch(console.warn);
  }

  return (
    <View>
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
                        style={styles.input}
                        keyboardType={"numeric"}
                        value={col === 0 ? "" : col.toString()}
                        // value={col.toString()}
                        maxLength={1}
                        // editable={col === 0 ? true : false}
                        // editable={cloneBoard[row_index][col_index] === 0 ? true : false}
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
          <View style={{ marginTop: 10}}>
            <Button title="Submit" onPress={() => solveSudoku()} />
          </View>
        ) : (
          <View style={{ marginTop: 10}}>
        <Button title="validate" onPress={() => navigation.navigate('Home')} />
      </View>
        )
      }
    </View>
    
  )
}

const styles = StyleSheet.create({
  input: {
    margin: 0,
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: "solid",
    textAlign: "center",
    width: 30,
    height: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});