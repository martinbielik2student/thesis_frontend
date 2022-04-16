import React from "react";
import { AddIcon, MinusIcon, Input, IconButton, Checkbox, Text, Box, VStack, HStack, Heading, Center, ScrollView } from "native-base";
import { request } from "../utility/requests";
import { GET, GET_ROW_NOTES, ADD_NOTE_PATH, POST, DELETE_NOTE_PATH, CHANGE_NOTE_STATE_PATH } from "../utility/constants";

const ToDoList = (props) => {
  const instState = [];
  const [list, setList] = React.useState(instState);
  const [inputValue, setInputValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const rowId = props.route.params.itemId;

  React.useEffect(()=>{
    try {
      setLoading(true);
      request(GET, GET_ROW_NOTES + rowId, null, props.token)
        .then(response => {
          if(response.status === 401){
            props.setToken('');
            return;
          }
          if (!response.ok) {
            setLoading(false);
            return;
          }
        setLoading(false);
        return response.json();
      })
      .then(json =>{
        if(json){
        setList(json);
        }
      });     
    } catch (error) {}
  }, [update]);

  const addItem = title => {
    try {
      setLoading(true);
      request(
        POST,
        ADD_NOTE_PATH,
        {
          timeTableRowId: rowId,
          note: {
            title: title,
            completed: false,
          },
        },
        props.token,
        )
          .then(response => {
            if(response.status === 401) {
              props.setToken('');
              return;
            }
            if (!response.ok) {
              setLoading(false);
              return;
            }
            setLoading(false);
            return response.json();
          }).then((json)=>{
            if(json){
        setUpdate(!update);
            }
      });
    }catch (error) {}
  };

  const handleDelete = index => {
    try {
      setLoading(true);
      request(
        POST,
        DELETE_NOTE_PATH,
        {
        timeTableRowId:rowId,
        noteId: index,
      },
      props.token,
      )
      .then(response => {
        if(response.status === 401){
          props.setToken('');
          return;
        }
        if (!response.ok) {
          setLoading(false);
          return;
        }
        setLoading(false);
        return response.json();
      }).then((json)=>{
        if(json){
          setUpdate(!update);
          }
      });

    }catch (error) {}
  };

  const handleStatusChange = item => {
    try {
      setLoading(true);
      request(POST, CHANGE_NOTE_STATE_PATH, {
        "timeTableRowId":rowId,
        "noteId": item.id,
        "completed": !item.completed
      }, props.token)
      .then(response => {
        if(response.status === 401){
          props.setToken('');
          return;
        }
        if (!response.ok) {
          setLoading(false);
          return;
        }
        setLoading(false);
        return response.json();
      }).then((json)=>{
        if(json){
          setUpdate(!update);
          }
      });
    }catch (error) {}
  };
  return (
  <ScrollView >
  <Center w="100%">
      <Box maxW="300" w="100%" paddingTop={"5%"}>
        <Heading mb="2" size="md">
          Notes
        </Heading>
        <VStack space={4}>
          <HStack space={2}>
            <Input flex={1} onChangeText={v => setInputValue(v)} value={inputValue} placeholder="Add Task" />
            <IconButton borderRadius="sm" variant="solid" icon={
            <AddIcon name="plus" size="sm" color="warmGray.50" />
            } onPress={() => {
            addItem(inputValue);
            setInputValue("");
          }} />
          </HStack>
          <VStack space={2}>
            {list.map((item, itemI) => <HStack w="100%" justifyContent="space-between" alignItems="center" key={item.title + itemI.toString()}>
                <Checkbox isChecked={item.completed} onChange={() => handleStatusChange(item)} value={item.title}>
                  <Text mx="2" strikeThrough={item.completed} _light={{
                color: item.completed ? "gray.400" : "coolGray.800"
              }} _dark={{
                color: item.completed ? "gray.400" : "coolGray.50"
              }}>
                    {item.title}
                  </Text>
                </Checkbox>
                <IconButton size="sm" colorScheme="trueGray" icon={<MinusIcon name="minus" size="xs" color="trueGray.300" />} onPress={() => handleDelete(item.id)} />
              </HStack>)}
          </VStack>
        </VStack>
      </Box>
    </Center>
    </ScrollView>)
};

    export default ToDoList;