/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Text,
  HStack,
  Center,
  Heading,
  Box,
  VStack,
  FormControl,
  Input,
  Button,
  Alert,
  Collapse,
  IconButton,
  CloseIcon
} from 'native-base';
import { request } from '../utility/requests';
import { POST, LOGIN_PATH } from '../utility/constants';

const Login = ({setToken}) => {

    const [aisId, setAisId] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState(false);
    const [errMessage, setErrMessage] = React.useState("");
    const [aisIdIsInvalid, setAisIdIsInvalid] = React.useState(false);
    const [passwordIsInvalid, setPasswordIsInvalid] = React.useState(false);
  
    const handleAisIdChange = text => {
      setAisId(text);
      const aisIdRegex =  /^[0-9\b]+$/;
      const aisIdValidity = aisIdRegex.test(aisId);
      setAisIdIsInvalid(!aisIdValidity);
    }

    const handlePasswordChange = text => {
      setPassword(text);
      const passwordRegex =  /^[a-z0-9]+$/;
      const passwordValidity = passwordRegex.test(password);
      setPasswordIsInvalid(!passwordValidity);
    }

    const handleSignIn = () =>{
      if(aisId && password && !aisIdIsInvalid && !passwordIsInvalid){
        try {
          setLoading(true);
          request(POST, LOGIN_PATH, {
            aisId: aisId,
            password: password,
          })
            .then(response => {
              if (!response.ok) {
                setAisId('');
                setPassword('');
                setLoading(false);
                return response.text();
              }
              if (response.headers.get('Authorization')) {
                setAisId('');
                setPassword('');
                setLoading(false);
                setToken(response.headers.get('Authorization'));
              }
            })
            .then(message => {
              if(message){
              setErrMessage(
                message ? message : 'Unexpected error. Try again later!',
              );
              setAlert(true);
              }
            });
          } catch (error) {}
        } else {
          setErrMessage('Invalid ais id or password');
          setAlert(true);
        }
    };
  
    return( <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }}>
            Welcome
          </Heading>
          <Heading mt="1" _dark={{
          color: "warmGray.200"
        }} color="coolGray.600" fontWeight="medium" size="xs">
            Sign in to continue!
          </Heading>
  
          <VStack space={3} mt="5">
            <FormControl isInvalid={aisIdIsInvalid}>
              <FormControl.Label>Ais ID</FormControl.Label>
              <Input value={aisId} onChangeText={handleAisIdChange}/>
            </FormControl>
            <FormControl isInvalid={passwordIsInvalid}>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" value={password} onChangeText={handlePasswordChange} />
            </FormControl>

            <Collapse isOpen={alert}>
        <Alert w="90%" maxW="400" status="error">
          <VStack space={1} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text fontSize="md" fontWeight="medium" _dark={{
                color: "coolGray.800"
              }}>
                  Error!
                </Text>
              </HStack>
              <IconButton variant="unstyled" icon={<CloseIcon size="3" color="coolGray.600" />} onPress={() => setAlert(false)} />
            </HStack>
            <Box pl="6" _dark={{
            _text: {
              color: "coolGray.600"
            }
          }}>
              {errMessage}
            </Box>
          </VStack>
        </Alert>
      </Collapse>
            <Button mt="2"   onPress={handleSignIn} isLoading={loading} >
              <Text fontSize="sm" color="white" _dark={{
              color: "warmGray.200"
            }}>
                Sign in
              </Text>
            </Button>
          </VStack>
        </Box>
      </Center>);
  };
  export default Login;

