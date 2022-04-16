import React from "react";
import { Box, AspectRatio, Image, Text, Pressable } from "native-base";
import ToDoList from "../components/ToDoList";
import { request } from '../utility/requests';
import {GET, GET_ROW_PLAN, location} from '../utility/constants';
import MapView, {Marker} from 'react-native-maps';

const Details = (props) => {

  const [loading, setLoading] = React.useState(false);
  const [showMap, setShowMap] = React.useState(true);
  const rowId = props.route.params.itemId;
  const markerCoordinates = props.route.params.markerCoordinates;
  const[plan,setPLan] = React.useState('');

  React.useEffect(()=>{
    try {
      setLoading(true);
      request(GET, GET_ROW_PLAN + rowId, null, props.token)
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
        return response.text();
      })
      .then(text =>{
        if(text){
        setPLan(text);
        }
      });     
    } catch (error) {}
  }, []);

  return <Box alignItems="center" height={"100%"} width={"100%"} >
      <Box maxW="100%" maxH="100%"  rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} _web={{
      shadow: 2,
      borderWidth: 0
    }} _light={{
      backgroundColor: "gray.50"
    }}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
           {showMap? 
              <Image source={{
                uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
              }} alt="Map" />
            // In production
            //   <MapView
            //   initialRegion={{
            //     latitude: location.latitude,
            //     longitude: location.longitude,
            //     latitudeDelta: 0.0522,
            //     longitudeDelta: 0.0021,
            //   }}
            // >
            //   <Marker
            //     coordinate={{ latitude : markerCoordinates.latitude , longitude : markerCoordinates.longitude }}
            //   />
            // </MapView>
          :
              <Image source={{
                uri: `data:image/jpeg;base64,${plan}`
              }} alt="Photo" />
          }
          </AspectRatio>
          <Pressable onPress={()=>setShowMap(!showMap)} bg="primary.600" position="absolute" right="0" bottom="0" px="3" py="1.5" >
           {showMap ?
           <Text  
            color="warmGray.50"
            fontWeight="700"
            fontSize="xs"
          >PHOTO</Text>
           :
           <Text
           color="warmGray.50"
           fontWeight="700"
           fontSize="xs">MAP</Text>
           }
           </Pressable>
        </Box>
        <ToDoList {...props}></ToDoList>
      </Box>
    </Box>;
};

    export default Details;
    
