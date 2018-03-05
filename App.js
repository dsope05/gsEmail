import React from 'react';
import { StyleSheet, Button, Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'native-base';
import Login from './components/login';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      openEmailData: {},
      openEmail: false,
      emailOffset: 0,
      userInfo: {
        success: false, 
        email: '',
        name: '',
        userName: '',
      },
      userName: '',
      password: '',
      emailId: '',
      loader: true
    };
  }

  openEmail(openEmailData) {
    this.setState({
      openEmailData: openEmailData,
      openEmail: true
    }); 
  }

  closeEmail() {
    this.setState({
      openEmailData: {},
      openEmail: false   
    }); 
  }

  componentWillMount() {
    const url = 'http://auth.garagescript.org/session'
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({userInfo: json.userInfo});
          }).catch((err) => {
                console.log(err);
          });
  }

  login() {
    fetch('http://auth.garagescript.org/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: this.state.userName,
        password: this.state.password 
      }),
    }).then((r) => r.json())
      .then( r => { this.setState({userInfo: r})})
  }

  loginInput(e, property) {
    this.setState({
      [property]: e 
    });
  }

  loadEmails(loadMore) {
    let offSet = this.state.emailOffset
    if(loadMore) {
      this.setState({emailOffset: this.state.emailOffset + 10});
      offSet += 10; 
    } else {
      if (this.state.emailOffset > 0) {
        this.setState({emailOffset: this.state.emailOffset - 10});
        offSet -= 10;
      }
    }
    fetch(`http://gsemail.garagescript.org/emails?authUser=drsoper&emailId=drsoper@garagescript.org&offset=${offSet}&count=10`)
      .then((response)=> {
        return response.json();
      })
      .then((emailResponse)=> {
        this.setState({emails: emailResponse});
      }).catch(error=> console.log('error', error));
  }

  render() {
    if(this.state.userInfo.success && this.state.loader) {
      fetch(`http://d3.llip.life/emails?authUser=${this.state.userInfo.userName}&emailId=${this.state.userInfo.email}&offset=0&count=10`)
        .then((response)=> {
          return response.json();
        })
        .then((emailResponse)=> {
          this.setState({emails: emailResponse, loader: false});
        }).catch(error=> console.log('error', error));
     
    }
    const emailRecipients = this.state.emails.map((email, i)=> {
      return(
        <TouchableOpacity onPress={()=> this.openEmail(email)} key={i}>
        <Card style={styles.emailContainer} key={i}>
          <Text>
            {email.sender}
          </Text>
          <Text style={styles.subjectText}>
            {email.subject}
          </Text>
        </Card>
      </TouchableOpacity>
      ); 
    });
    if (!this.state.userInfo.success) {
      return (
        <Login userName={this.state.userInfo.userName} email={this.state.userInfo.email} login={()=> this.login()} usernameInput={(e)=> this.loginInput(e, 'userName')} passwordInput={(e)=> this.loginInput(e, 'password')}/> 
      ); 
    }
    if (this.state.openEmail) {
      return (
        <ScrollView style={styles.emailDisplayContainer}>
          <Card style={styles.displayCardContainer}>
            <Button onPress={()=> this.closeEmail()} title="X"> </Button>
            <Text style={styles.padding10}>
              {this.state.openEmailData.subject}
            </Text>
            <Text style={styles.displayText}>
              {this.state.openEmailData.text}
            </Text>
          </Card>
          <Button style={styles.replyBtn} onPress={()=>{}} title="Reply"> </Button>
        </ScrollView>
      ); 
    }
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>
          Welcome to Your Email Experience
        </Text>
        <View style={styles.loadBtns}>
          <Button style={styles.btnStyle} title="<" onPress={()=> this.loadEmails()}> <Text> HI </Text></Button>
          <Button title=">" onPress={()=> this.loadEmails('loadMore')}> </Button>
        </View>
        <View style={styles.scrollStyle}>
          <ScrollView>
            {emailRecipients}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#87CEFA',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  emailContainer: {
    flex: 1,
  },
  subjectText: {
    padding: 10 
  },
  scrollStyle: {
    flexDirection: 'row' 
  },
  welcomeText: {
    marginTop: 10,
    alignSelf: 'center',
    fontSize: 16,
    color: 'pink',
  },
  emailDisplayContainer: {
    flex: 1,
    padding: 30, 
    backgroundColor: 'pink',
  },
  displayCardContainer: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 15,
    minHeight: '90%'
  },
  padding10: {
    padding: 10,
  },
  displayText: {
    padding: 10, 
    paddingLeft: 20
  },
  loadBtns: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnStyle: {
    fontSize: 18 
  },
  replyBtn: {
  }

});
