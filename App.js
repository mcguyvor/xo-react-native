import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,Button, TouchableOpacity,Alert } from 'react-native';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';
export default function App() {

    const [gameState,setGameState]= useState([
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ]);

    const [currentPlayer,setCurrentPlayer] = useState(1);

    useEffect(()=>{
      initializeGame();
  },[]);

    const initializeGame = () =>{
      setGameState(
        [
          [0,0,0],
          [0,0,0],
          [0,0,0]
        ]
      );
      setCurrentPlayer(1);
    };

    const renderIcon = (row,col) =>{
      var value = gameState[row][col];
      switch(value){
        case 1 : return<Icon name='close' style={styles.tileX}/>
        case -1 : return <Icon name='circle-outline' style={styles.tile0}/>
        default: return <View/>;

      }
    }

    const onTilePress = (row,col) =>{

      // No tile change when tile not equal 0
      
        var value = gameState[row][col];
        if(value!==0){
          return ;
        }
      

        // current player
        var current = currentPlayer;

        var arr = gameState.slice();
        arr[row][col] = current;
        setGameState(arr);

        //switch player

        var nextPlayer = (current ==1)? -1 : 1;
        setCurrentPlayer(nextPlayer);
    }
 
    // return winner player
    const getWinner =()=>{
      const numTile = 3;
      var arr = gameState;
      var sum;

      //check row of sum
      for( var i=0;i<numTile;i++){
        sum = arr[i][0] + arr[i][1]+ arr[i][2];
        if(sum == 3){
            return 1; //mean 1+1+1 by player 1
          }else if(sum == -3){
          return -1; //mean -1-1-1 by player 2
          }
        }
    //check column
      for(var i=0;i<numTile;i++){
        sum = arr[0][i] + arr[1][i] + arr[2][i];
        if(sum == 3){
          return 1; //mean 1+1+1 by player 1
          }else if(sum == -3){
        return -1; //mean -1-1-1 by player 2
          }
        }
    //check diagonals
      sum = arr[0][0] + arr[1][1] + arr[2][2];
        if(sum==3){
          return 1;
        }else if(sum== -3){
          return -1;
        }
    // check diagonal from right side  
      sum = arr[0][2] + arr[1][1] + arr[2][0];
        if(sum==3){
          return 1;
        }else if(sum== -3){
          return -1;
        }
    
    // if no winner
        return 0;
      }
    
const winner = getWinner();
      if(winner == 1){
        Alert.alert('Player 1 is the winner');
        initializeGame();//reset game
      }else if(winner == -1){
        Alert.alert('Player 2 is the winner');
        initializeGame();//reset game
      }
  return (
    <View style={styles.container}>
      
      
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>onTilePress(0,0)} style={[styles.tiles,{borderLeftWidth:0, borderTopWidth:0}]}>
          {renderIcon(0,0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>onTilePress(0,1)} style={[styles.tiles,{borderTopWidth:0}]}>
          {renderIcon(0,1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>onTilePress(0,2)} style={[styles.tiles,{borderRightWidth:0, borderTopWidth:0}]}>
        {renderIcon(0,2)}
        </TouchableOpacity>
      </View>

      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>onTilePress(1,0)} style={[styles.tiles,{borderLeftWidth:0}]}>
          {renderIcon(1,0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>onTilePress(1,1)} style={styles.tiles}>
          {renderIcon(1,1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>onTilePress(1,2)} style={[styles.tiles,{borderRightWidth:0}]}>
          {renderIcon(1,2)}
        </TouchableOpacity>
      </View>

      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>onTilePress(2,0)} style={[styles.tiles,{borderLeftWidth:0, borderBottomWidth:0}]}>
        {renderIcon(2,0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>onTilePress(2,1)} style={[styles.tiles,{ borderBottomWidth:0}]}>
        {renderIcon(2,1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>onTilePress(2,2)} style={[styles.tiles,{borderRightWidth:0, borderBottomWidth:0}]}>
        {renderIcon(2,2)}
        </TouchableOpacity>
      </View>

    <View style={styles.playername}>
      <Button title={`${currentPlayer==1? 'Player1': 'Player2'}`} style={{color:`${(currentPlayer==1)? 'red':'black'}`}}/>
    </View>
  </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tiles:{
    borderWidth:5,
    width:100,
    height:100,
    alignItems:'center',
    justifyContent:'center'
  },
  tileX:{
    color:'red',
    fontSize:60,

  },

  tile0:{
    color:'black',
    fontSize:60,
  },
  playername:{
    flex:0,
    alignItems:'flex-end',
    justifyContent:'flex-end',
    marginVertical:100,

  }
});
