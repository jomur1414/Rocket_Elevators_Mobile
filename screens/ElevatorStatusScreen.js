import React, { useState } from 'react';
import { ActivityIndicator, Button, ImageBackground, StyleSheet, Text, View } from 'react-native';
import background from '../assets/AdobeStock_122227340.jpeg';
import Card from '../components/card';

export default class ElevatorStatus extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.getParam('id'),
            status: this.props.navigation.getParam('status')
        }
    }
    //https://reactnavigation.org/docs/4.x/params/
//https://stackoverflow.com/questions/45388957/how-to-pass-parameters-to-screen-in-stacknavigator


    changeStatusToActive = async () => {
      this.state.id = this.props.navigation.getParam('id');

      const response = await fetch(`https://floating-citadel-15630.herokuapp.com/api/elevators/${this.state.id}`, {
              method: 'PUT',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                  'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
              },
              body: JSON.stringify({
                'status': 'Active'
              })
          });
      this.setState({ 
          status: 'Active'
      });
      this.displayButton();
    };

    displayButton = () => {
      if(this.state.status === 'Active') {
        return(
          <View>
            <Text style={styles.informations} >Press the button below to select another elveator</Text>
            <Button style={styles.button} title='Back to the list of elevator' onPress={() => this.props.navigation.navigate('Home')} />
          </View>
        );
      } else {
        return(
          <View>
            <Text style={styles.informations} >Press the button to update the status to active</Text>
            <Button style={styles.button} title='Update the status to Active' onPress={(this.changeStatusToActive)} />
          </View>
        );
      }
    };

    render() {
        const { navigation } = this.props;
        if (this.state.isLoading) {
            return (
                <View style={styles.container} >
                    <ActivityIndicator />
                </View>
            )
        } else {
            let { id } = this.state;
            const status = this.state.status;
  

            return (
                <View style={styles.container} >
                    <ImageBackground source={background} style={styles.background}>
                    <Text style={styles.welcome} > Update status of elevator #{ navigation.getParam('id')}</Text>

                    <Card>
                        <Text> Elevator ID : { navigation.getParam('id')}</Text>
                        <Text> Column ID : { navigation.getParam('column_id')}</Text>
                        <Text> Building Type  : { navigation.getParam('building_type')}</Text>
                        <Text> Serial number : { navigation.getParam('serial_number')}</Text>
                        <Text> Model : { navigation.getParam('model')}</Text>
                        <Text> Notes : { navigation.getParam('notes')}</Text>

                        <Text style={[(status === "Active") ?  styles.operationalColor : styles.NonOperationalColor]}>
                         Current status: {status}</Text>
                    </Card>
                    {this.displayButton()}
                    </ImageBackground>
                </View>
            )
        }
    }
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      marginTop: 26,
      padding: 32,
      backgroundColor: 'pink',
      fontSize: 22,
    },
    background: {
      flex: 1,
      width: '100%',
      height: '100%',    
      alignItems: 'center',
      justifyContent: 'center',
    },
    operationalColor: {
      color: 'green',
      fontSize: 20
    },
    NonOperationalColor: {
      color: 'red',
      fontSize: 20
    },
    welcome: {
      color: 'white',
      fontSize: 32,
      marginHorizontal: 22,
      marginBottom: 50,
    },
    informations: {
      backgroundColor: '#000',
      color: 'white',
      fontSize: 20,
      marginHorizontal: 15,
      marginBottom: 40,
    },
    button: {
      backgroundColor: "red",
      padding: 24,
      borderRadius: 12,
    },
});