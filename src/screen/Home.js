import React from 'react';
import {StyleSheet,Text,View,Button,TouchableOpacity} from 'react-native';
export default function Home(props){
    return(
        <View style={styles.container}>
            <Text style={{fontSize:'30'}}>X O GAME</Text>
            <TouchableOpacity
                style={styles.multiplayer}
                onPress={()=> props.navigation.navigate('Multiplayer') }
                underlayColor='#fff'>
                <Text style={styles.buttontext}>Multiplayer</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.singleplayer}
                onPress={()=> props.navigation.navigate('Singleplayer') }
                underlayColor='#fff'>
                <Text style={styles.buttontext}>Singleplayer</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent: 'center'
    },
    multiplayer:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#57def2',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
  },
    singleplayer:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#f030cd',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
},
    buttontext:{
      color:'#fff',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10,
      fontSize:20
  }
    
})