import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Button, Header, Content, Item, Input } from 'native-base';

const Login = ({login, usernameInput, passwordInput}) => {
    return (
      <Container>
        <Header style={styles.marginTop}>
          <Text>
            GS Email 
          </Text>
        </Header>
        <View style={styles.content}>
          <Image style={styles.gsImage} source={require('../assets/garageScriptLogo.png')} />
          <Item>
            <Input onChangeText={(e)=> usernameInput(e, 'userName')} placeholder="Username" />
          </Item>
          <Item>
            <Input secureTextEntry={true}  onChangeText={(e)=> passwordInput(e, 'password')} placeholder="Password" />
          </Item>
          <Button onPress={login} block info style={styles.loginBtn}>
            <Text>
              Login 
            </Text>
          </Button>
        </View>
      </Container>
    )
  }

const styles = StyleSheet.create({
  marginTop: {
    paddingTop: 30 
  },
  loginBtn: {
    marginTop: 20 
  },
  content: {
    padding: 15,
    height: '60%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gsImage: {
    width: 100,
    height: 100,
    marginBottom: 15
  }
});

export default Login;
