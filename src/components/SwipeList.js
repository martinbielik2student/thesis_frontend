import React, { useState, useEffect } from "react";
import {  Box, Text, Pressable, Heading,  HStack, Avatar, VStack, Spacer, Center, InfoIcon } from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import {request} from '../utility/requests';
import {GET, TIMETABLE_PATH} from '../utility/constants';

const Basic = (props) => {
     const data = [];
    const [listData, setListData] = useState(data);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
      try {
        setLoading(true);
        request(GET, TIMETABLE_PATH,null,props.token)
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
          setListData(json.rows)
          }
        });
      } catch (error) {}
    },[]);
  
    const closeRow = (rowMap, rowKey) => {
      if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
      }
    };
  
    const deleteRow = (rowMap, rowKey) => {
      closeRow(rowMap, rowKey);
      const newData = [...listData];
      const prevIndex = listData.findIndex(item => item.key === rowKey);
      newData.splice(prevIndex, 1);
      setListData(newData);
    };
  
    const onRowDidOpen = rowKey => {
      console.log("This row opened", rowKey);
    };
  
    const renderItem = ({item,index}) => {
      let bgr;
      switch(item.subjectAbbreviation) {
        case 'KI/PR/15':
          bgr='amber.100';
          break;
        case 'KI/UNIX/15':
          bgr='cyan.100';
          break;
        case 'KI/NMO/15':
          bgr='emerald.100';
          break;
        case 'KI/ZKPB/16':
          bgr='fuchsia.100';
          break;
        case 'KI/IS/15':
          bgr='indigo.100';
          break;
        case 'KI/bSBP01/15':
          bgr='lime.100';
          break;
        default : bgr = 'gray.400';
      }
      let abb = item.subjectAbbreviation;
      while(abb.indexOf('/') > 0) {
        abb = abb.slice(abb.indexOf('/') + 1);
        abb = abb.slice(0, abb.indexOf('/'));
      }
      abb = abb.length > 2 ? abb.slice(0,2) : abb;
      const subject =
       item.subject.length < 19
         ? item.subject
         : item.subject.slice(0, 17) + '...';
      const startDateTime = item.startDateTime.replace(' ', '\n\t\t\t\t');
      return(
      <Box>
        <Pressable
        onPress={() =>{
          props.navigation.navigate('Details', {
            itemId: item.id,
            markerCoordinates: item.location.coordinates
          });
        }
        } _dark={{
        bg: "coolGray.800"
      }} _light={{
        bg: "white"
      }}>
          <Box pl="4" pr="5" py="2">
            <HStack alignItems="center" space={3}>
              <Avatar size="48px" background={bgr} >
              {abb}
              </Avatar>
              <VStack>
                <Text color="coolGray.800" _dark={{
                color: "warmGray.50"
              }} bold>
                  {subject}
                </Text>
                <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
              }}>
                  Classroom: {item.location.room}
                </Text>
              </VStack>
              <Spacer />
              <Text fontSize="xs" color="coolGray.800" _dark={{
              color: "warmGray.50"
            }} alignSelf="flex-start">
                {startDateTime}
              </Text>
            </HStack>
          </Box>
        </Pressable>
      </Box>
      )
    }
  
    const renderHiddenItem = (data, rowMap) => <HStack flex="1" pl="2">
        <Pressable w="70" ml="auto"  bg="coolGray.200" justifyContent="center" onPress={() => closeRow(rowMap, data.item.key)} _pressed={{
        opacity: 0.5
      }}>
          <VStack alignItems="center" space={2}>
            <InfoIcon size="sm" color="white" name="info" />
            <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
              More
            </Text>
          </VStack>
        </Pressable>
        <Pressable w="70"  bg="red.500" justifyContent="center" onPress={() => deleteRow(rowMap, data.item.key)} _pressed={{
        opacity: 0.5
      }}>
          <VStack alignItems="center" space={2}>
            <InfoIcon size="sm" color="white" name="info" />
            <Text color="white" fontSize="xs" fontWeight="medium">
              Delete
            </Text>
          </VStack>
        </Pressable>
      </HStack>;
  
    return <Box bg="white" safeArea flex="1">
        <SwipeListView data={listData} renderItem={renderItem} renderHiddenItem={renderHiddenItem} rightOpenValue={-130} previewRowKey={"0"} previewOpenValue={-40} previewOpenDelay={3000} onRowDidOpen={onRowDidOpen} />
      </Box>;
  }
const SwipeList = (props) => {
  const [mode, setMode] = React.useState('Basic');
    return <Center h="100%">
        <Box _dark={{
        bg: "coolGray.800"
      }} _light={{
        bg: "white"
      }} flex="1" safeAreaTop maxW="400px" w="100%">
          <Heading p="4" pb="3" size="lg">
            Timetable
          </Heading>
            <Basic {...props} token={props.token} setToken={props.setToken} />
        </Box>
      </Center>;
  }
  export default SwipeList;
