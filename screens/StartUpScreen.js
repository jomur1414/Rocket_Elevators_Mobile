import React from 'react';
import { ActivityIndicator, Button, Image, ImageBackground, 
    StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import logoRocket from '../assets/R2.png';
import background from '../assets/AdobeStock_122227340.jpeg';

export default class StartupApplication extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            email: null,
            password: null
        }
    }
//https://www.codingame.com/playgrounds/41961/cycle-de-vie-dun-composant-react-render-et-componentdidmount
    componentDidMount() {
        this.getEmailFromEmployee();
    }
  //  https://developers.facebook.com/docs/react-native/login/
    getEmailFromEmployee = async () => {
        const response = await fetch(`https://floating-citadel-15630.herokuapp.com/api/employees/email/${this.state.email}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS'
            }
        });
    
        const validPassword = await fetch(`https://floating-citadel-15630.herokuapp.com/api/employees/secretcode/${this.state.password}`);


        if (this.state.email == null) {
           // alert("Login failed with error: ");
        } else if (response.status === 200 && validPassword.status === 200) {
            this.props.navigation.navigate('Home');
        } else {
            return alert('Please enter a valid email and password');
        }
        this.setState({
            isLoading: false
        });
    };

//https://reactnative.dev/docs/intro-react
//https://medium.com/@agent_hunt/introduction-to-react-native-renderers-aka-react-native-is-the-java-and-react-native-renderers-are-828a0022f433

    render() {

        if (this.state.isLoading) {
            return (
                <View style={styles.container} >
                    <ActivityIndicator />
                </View>
            )
        } else {
            let { email } = this.state;
            let { password } = this.state;
            return (
                <View style={styles.container} >
                    <ImageBackground source={background} style={styles.background}>
                    <Image source={logoRocket} style={styles.logoRocket} />
                        <Text style={styles.welcomeLine} >Welcome to Rocket Elevators Mobile application !</Text>
                        <Text style={styles.information} >Please enter a valid employee email and password from Rocket Elevators</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder= 'emailEmployee@codeboxx.biz'
                            onChangeText={(email) => {this.setState({email: email})}}
                        />
                         <TextInput 
                            style={styles.input}
                            placeholder= 'password'
                            onChangeText={(password) => {this.setState({password: password})}}
                        />

                        <Button title='Login' onPress={(this.getEmailFromEmployee)} />
                    </ImageBackground>
                </View>

            );
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
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoRocket: {
        width: 300,
        height: 100,
        marginTop: 20,
        marginBottom: 30,
        resizeMode: "contain",

    },
    welcomeLine: {
        color: 'white',
        fontSize: 30,
        marginHorizontal: 15,
        marginBottom: 50,
    },
    information: {
        color: 'white',
        fontSize: 30,
        marginHorizontal: 15,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        backgroundColor: '#fff',
        padding: 8,
        margin: 10,
        width: 300,
    },
});

