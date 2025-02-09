import React from 'react';
import { AppRegistry } from 'react-native';
import Navigation from './Navigation'; // Your navigation file


const appName = "AroundYou";

const App = () => (


    <Navigation />);

AppRegistry.registerComponent(appName, () => App);

export default App;