import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import Tarefa from './Tarefa'

export default function App(){
  const [tarefa, setTarefa] = useState('');
  const [list, setList] = useState([])

  // adicionar as tarefas
  function handleAdd(){ 
    if(tarefa === ''){
      return;
    }
    const dados = {
      key: Date.now(),
      item: tarefa
    }
    setList(oldArray => [dados, ...oldArray]);
    setTarefa('')
  }

  //função deletar item
  function handleDelete(item){
    let filtroItem = list.filter((tarefa) => {
      return (tarefa.item !== item)
    })
    setList(filtroItem)
  }

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Lembretes</Text>
      <Text style={styles.text}>Forma mais fácil de lembrar das suas tarefas</Text>
      <View style={styles.containerInput}>
        <TextInput
          placeholder="O que você deseja lembrar?"
          style={styles.input}
          value={tarefa}
          onChangeText={ (text) => setTarefa(text) }
        />

        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <FontAwesome name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={list}
        keyExtractor={ (item) => item.key}
        renderItem={ ({ item }) => <Tarefa data={item} deleteItem={ () => handleDelete(item.item) } /> }
        style={styles.list}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 32
  },
  title:{
    fortSize: 50,
    color: '#121212',
    fontWeight: 'bold',
    textAlign:'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  text: {
    fortSize: 32,
    justifyContent: 'center',
    color: '#121212',
    textAlign:'center'
  },
  containerInput:{
    flexDirection: 'row', //simbolo ficar ao lado
    width: '100%', //largura
    height: 44, //altura
    alignItems: 'center', //centralizar vertical
    justifyContent: 'center', //centralizar horizontal
    marginBottom: 22,
  },
  input:{
    width: '75%',
    backgroundColor: '#d3d3d3',
    height: 44,
    borderRadius: 4, //arredondar bordas
    paddingHorizontal: 8, //espaçamento no input
    marginTop: '5%',
  },
  buttonAdd:{
    width: '15%',
    height: 44,
    backgroundColor: '#73f7ff',
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginTop: '5%',
  },
  list:{
    flex:1,
    backgroundColor: '#fff',
    paddingStart: '4%',
    paddingEnd: '4%',
  }
})
