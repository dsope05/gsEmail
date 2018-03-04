import React from 'react';
import { StyleSheet, Button, Text, View, FlatList, ScrollView } from 'react-native';
import { Card } from 'native-base';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      openEmail: {}
    };
    //this.fetchEmails = this.fetchEmails.bind(this);
  }

  componentWillMount(){
    fetch('http://d3.llip.life/emails?authUser=drsoper&emailId=drsoper@garagescript.org&offset=0&count=10')
      .then((response)=> {
        return response.json();
      })
      .then((emailResponse)=> {
        this.setState({emails: emailResponse});
      }).catch(error=> console.log('error', error));
  }
  openEmail(openEmailData) {
    this.setState({
      openEmail: openEmailData 
    }); 
  }

  render() {
    const emailRecipients = this.state.emails.map((email, i)=> {
      return(
        <Card style={styles.emailContainer} onPress={()=> this.openEmail(email)} key={i}>
          <Text>
            {email.recipient}
          </Text>
        </Card>
      ); 
    });
    return (
      <View style={styles.container}>
        <ScrollView>
          {emailRecipients}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'blue',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  emailContainer: {
    flex: 1,
  }

});
