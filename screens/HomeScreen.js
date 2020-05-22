import React, { useState } from 'react';
import { Text, View, ActivityIndicator, Button, FlatList, ImageBackground, 
         TouchableOpacity, StyleSheet} from 'react-native';
import background from '../assets/AdobeStock_179073967.jpeg';
import Card from '../components/card';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataElevatorInacInter: null,
            dataNumnberElevatorsIntervetion: null,
            dataNumberElevatorsInactive: null
        }
    }

    componentDidMount() {
        this.getInformationAboutElevators();
    }

    getInformationAboutElevators = async () => {
        const response = await fetch('https://floating-citadel-15630.herokuapp.com/api/elevators');
        const responseNumberElevatorsIntervention = await fetch('https://floating-citadel-15630.herokuapp.com/api/elevators/get/status/intervention');
        const responseNumberElevatorsInactive = await fetch('https://floating-citadel-15630.herokuapp.com/api/elevators/get/status/inactive');

        const elevatorInactiveOrIntervention = await response.json(response.body);
        const elevatorNumberElevatorsIntervention = await responseNumberElevatorsIntervention.json(response.body);
        const elevatorNumberElevatorsInactive = await responseNumberElevatorsInactive.json(response.body);

        this.setState({
            isLoading: false,
            dataElevatorInacInter: elevatorInactiveOrIntervention ,
            dataNumnberElevatorsIntervetion: elevatorNumberElevatorsIntervention,
            dataNumberElevatorsInactive: elevatorNumberElevatorsInactive

        });
    };

    
//https://reactnative.dev/docs/flatlist
    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container} >
                    <ActivityIndicator />
                </View>
            )
        } else {
            return (
            <View style={styles.container} >
                <ImageBackground source={background} style={styles.background}>

                <Text style={styles.greetings} >Lists of all elevators who are in status "Inactive" or in "Intervention</Text>
                <Text style={styles.information} >There are currently {this.state.dataElevatorInacInter.length} who are not running</Text>
                <Text style={styles.information} >There are currently {this.state.dataNumnberElevatorsIntervetion.length} elevators with intervention status</Text>
                <Text style={styles.information} >There are currently {this.state.dataNumberElevatorsInactive.length} elevators with inactive status</Text>

                <FlatList style={styles.listElevator}
                    data = {this.state.dataElevatorInacInter}  //data = reserved word
                    keyExtractor = {(key, val) => val.toString()}
                    renderItem = {({ item }) => (
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ElevatorStatus', item)}>
                        <Card>
                            <Text>Elevator ID #{item.id} Status : {item.status}</Text>
                        </Card>
                        </TouchableOpacity>
                    )}
                />

                <Button style={styles.button} title='LogOut' onPress={() => this.props.navigation.navigate('StartupApplication')} />

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
      justifyContent: 'space-between',
    },
    listElevator: {
        color: 'blue',
      },
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    greetings: {
      color: 'blue',
      fontSize: 22,
      marginHorizontal: 15,
      marginBottom: 10,
    },
    information: {
      color: 'blue',
      fontSize: 18,
      marginHorizontal: 15,
      marginBottom: 10,
    },
    button: {
      backgroundColor: "blue",
      padding: 20,
      margin: 10,
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 20,
      color: '#fff',
    },
});
