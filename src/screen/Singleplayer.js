import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,Button, TouchableOpacity,Alert } from 'react-native';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';
export default function SinglePlayer(){ 
const initialState = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ]
  const [gameState,setGameState]= useState(initialState);

  const [currentPlayer,setCurrentPlayer] = useState(1);

  useEffect(()=>{
      bot();
},[gameState]);

  const initializeGame = () =>{
    setGameState(initialState);
    setCurrentPlayer(1);
  };

  const renderIcon = (row,col) =>{
    const value = gameState[row][col];
    switch(value){
      case 1 : return<Icon name='close' style={styles.tileX}/>
      case -1 : return <Icon name='circle-outline' style={styles.tile0}/>
      default: return <View/>;

    }
  }

  const onTilePress = (row,col) =>{

    // No tile change when tile not equal 0
    
      const value = gameState[row][col];
      if(value!==0){
        return ;
      }
    

      // current player
      const current = currentPlayer;

      const arr = gameState.slice();
      arr[row][col] = current;
      setGameState(arr);

      //switch player

      const nextPlayer = (current ==1)? -1 : 1;
      setCurrentPlayer(nextPlayer);
  }

  // return winner player
  const getWinner =()=>{
    const numTile = 3;
    const arr = gameState;
    let sum;

    //check row of sum
    for( let i=0;i<numTile;i++){
      sum = arr[i][0] + arr[i][1]+ arr[i][2];
      if(sum == 3){
          return 1; //mean 1+1+1 by player 1
        }else if(sum == -3){
        return -1; //mean -1-1-1 by player 2
        }
      }
  //check column
    for(let i=0;i<numTile;i++){
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

const  winner = getWinner();
    if(winner == 1){
      Alert.alert('Player 1 is the winner');
      initializeGame();//reset game
    }else if(winner == -1){
      Alert.alert('Bot is the winner');
      initializeGame();//reset game
    }

const onNewGamePress = () =>{
setGameState(initialState);
setCurrentPlayer(1);
}

const bot = () =>{
          let end = false;
          for(let i=0;i<3;i++){
            check = gameState[i].includes(0);
            if(check){
              end = check;
              break;
            }
          }
          
          while(currentPlayer == -1 && end){
              let row = Math.floor(Math.random() * (3 - 0) + 0);
              let col = Math.floor(Math.random() * (3 - 0) + 0);
              let value = gameState[row][col];
              const current = currentPlayer;
              if(value==0){
                  const arr = gameState.slice();
                  arr[row][col] = current;
                  setGameState(arr);
                  const nextPlayer = (current ==1)? -1 : 1;
                  setCurrentPlayer(nextPlayer);
                  break;
              }
          }
        
}       

return (
  <View style={styles.container}>
    
    <View style={styles.player1sign}><Text style={styles.playertext}>Player 1 : X</Text></View>
    
    <View style={styles.player2sign}><Text style={styles.playertext}>Bot : 0</Text></View>
    
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
    <Button title={`${currentPlayer==1? 'Player 1 X': 'Bot'}`} />
  </View>

  <View >
    <Button title='Restart game' onPress={onNewGamePress} style={[styles.newGame]}   color="#841584"/>
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
  paddingTop: 40,

},
newGame:{
  flex:0,
  alignItems:'flex-end',
  justifyContent:'flex-end',
  paddingTop: 10,
},
player1sign:{
    position:'absolute',
    top:10,
},
player2sign:{
    position:'absolute',
    top:40,
},
playertext:{
    fontSize:20,

}
});

