import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import hangImgs from "./assets/hangman"

class Hangman extends React.Component {
  constructor(props) {
    super(props);
    this.word = props.word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().split("")
    this.alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
    this.state = {
      errors: 0,
      used: [],

      string: this.word.map(l => l.toLowerCase() === l.toUpperCase() ? l : '*')
    }
    console.log(this.word)
  }

  onLose = () => {
    console.log("LOOSE")
  }

  onWin = () => {
    console.log("WIN")
  }

  useLetter = (l) => {
    let error = 0
    if (!this.word.some((s) => s === l))
      error++
    if (this.state.errors + error === hangImgs.length - 1)
      setTimeout(this.onLose, 2000)
    const newString = this.word.map((s, id) => s === l ? s : this.state.string[id])
    console.log(newString.join(""), this.word)
    if (newString.join("") === this.word.join(""))
      setTimeout(this.onWin, 2000)
    this.setState({ used: [...this.state.used, l], errors: this.state.errors + error, string: newString })
  }

  render() {
    const { errors, string, used } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.imgCont}>
          <Image source={hangImgs[errors]} style={styles.img} resizeMode="contain" />
          <Image source={hangImgs[hangImgs.length - 1]} style={[styles.img, styles.imgHover]} resizeMode="contain" />
        </View>
        <View style={styles.stringContainer}>
          <Text style={styles.string}>{string.join("")}</Text>
        </View>
        {errors < hangImgs.length - 1 && <View style={styles.lettersContainer}>
          {this.alphabet.map(l => {
            const use = used.includes(l)
            return <TouchableOpacity style={[styles.letterContainer, use ? styles.letterUse : {}]} onPress={() => this.useLetter(l)} disabled={use} >
              <Text style={[styles.letter, { color: use ? "grey" : "black", }]}>{l}</Text>
            </TouchableOpacity>
          })}
        </View>}
      </View >
    );
  }
}


const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    padding: 20
  },
  imgCont: {
    height: "40%",
    width: "70%",
    maxWidth: 700,
  },
  img: {
width: "100%", height: "100%"
  },
  imgHover: {
opacity: 0.1, top: 0, left: 0, right: 0, bottom: 0, position: "absolute"
  },
  stringContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
    margin: 10
  },
  string: {
    fontSize: 20,
    margin: 10,
    letterSpacing: 10,
    textAlign: "center",
  },
  lettersContainer: {
    margin: 10,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  letterContainer: {
    margin: 5,
    backgroundColor: "white",
    minWidth: 40,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  letterUse: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  letter: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "black"
  }
});


export default Hangman;