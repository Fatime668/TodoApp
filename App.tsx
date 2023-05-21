import { FlatList, SafeAreaView,Image,StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'

import { ListItem } from '@rneui/themed';
const colors = {primary:"#1f145c",white:"#fff"}


const App = () => {
  const [textInput,setTextInput] = useState('')
  const [todos,setTodos]=useState<any>([
    {id:1,task:"First todo",completed:true},
    {id:2,task:"Second todo",completed:false}
  ])

  const ListItem = ({todo}:any) =>{
    return <View style={styles.listItem}>
      <View>
        <Text style={{fontWeight:"bold",fontSize:15,color:colors.primary,textDecorationLine:todo?.completed? "line-through" : "none"}}>{todo?.task}</Text>
      </View>
      <View style={{flexDirection:"row"}}>
      {
        !todo?.completed && (
          <TouchableOpacity style={[styles.completed]} onPress={()=>markTodoComplete(todo?.id)}>
           <Image style={{width:10,height:20}} source={require("./assets/comp.png")} />
          </TouchableOpacity>
        )
      }
          <TouchableOpacity style={[styles.deletetxt]} onPress={()=>deleteTodo(todo?.id)}>
            <Text style={{color:colors.white,fontWeight:"600"}}>remove</Text>
          </TouchableOpacity>
          </View>
    </View>
  }
  const addTodo=()=>{
    if (textInput == '') {
      Alert.alert("Please input todo!")
    }else{
      const newTodo = {
        id:Math.random(),
        task:textInput,
        completed:false
      };
      setTodos([...todos,newTodo])
      setTextInput('')
    }
   
  }
  const markTodoComplete = (todoId:any)=>{
    const newTodos = todos.map((item:any)=>{
        if (item.id == todoId) {
          return {...item,completed:true}
        }
        return item
    })
    setTodos(newTodos)
  }

  const deleteTodo=(todoId:any)=>{
    const exisitedId = todos.filter((item:any)=>item.id!=todoId)
    setTodos(exisitedId )
  }
  const clearTodos =()=>{
       setTodos([])
  }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:colors.white}}>
      <View style={styles.header}>
        <Text style={{fontWeight:"bold",fontSize:20,color:colors.primary}}>TODO APP</Text>
        <Text onPress={clearTodos} style={{fontWeight:"bold",fontSize:20,color:"tomato"}}>Delete</Text>
      </View>
      <FlatList 
      showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding:20,paddingBottom:100}}
        data={todos}
        renderItem={({item}) =>
        <ListItem todo={item}/>}
      />
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput 
          value={textInput}
          onChangeText={(text)=>setTextInput(text)} 
          placeholder='Add Todo' />
        </View>
       <TouchableOpacity onPress={addTodo}>
        <View style={styles.iconContainer}>
          <Text style={{fontSize:30,color:colors.white}}>+</Text>
        </View>
      </TouchableOpacity>
      </View>
    
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  completed:{
    backgroundColor: "green",
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 3,
    paddingVertical:5,
    paddingHorizontal:10
  },
  deletetxt:{
    backgroundColor: "tomato",
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    fontSize:12,
    borderRadius: 3,
    padding:5,
    
  },
  header:{
    padding:20,
    flexDirection:'row',
    alignItems:"center",
    justifyContent:'space-between'
  },
  listItem:{
    padding:20,
    backgroundColor:colors.white,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    borderRadius:7,
    marginVertical:10,
    shadowColor: "#000000",
    shadowOffset: {
    width: 0,
    height: 6,
    },
    shadowOpacity:  0.20,
    shadowRadius: 5.62,
    elevation: 8
  },
  footer:{
    position:"absolute",
    bottom:0,
    color:colors.white,
    width:"100%",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    paddingHorizontal:20,
    marginVertical:20
  },
  inputContainer:{
    color:colors.white,
    flex:1,
    padding:20,
    marginVertical:20,
    borderColor:"#ccc",
    borderWidth:1,
    marginRight:20,
    borderRadius:30,
    paddingHorizontal:20,
    shadowColor: "#000000",
    shadowOffset: {
    width: 0,
    height: 6,
    },
    shadowOpacity:  0.20,
    shadowRadius: 5.62,
    elevation: 8
  },
  iconContainer:{
    height:50,
    width:50,
    backgroundColor:colors.primary,
    borderRadius:50,
    elevation:40,
    justifyContent:"center",
    alignItems:"center"
  }
})