import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import HomeScreen from './view/HomeScreen';
import CreateGameScreen from './view/CreateGameScreen';

import Menu from './components/Menu';

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen
    },
);

const CreateNewGameStack = createStackNavigator(
    {
        CreateNewGame: CreateGameScreen
    },
);

const MenuNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: {
                drawerLabel: 'Game'
            }
        },
        CreateNewGame: {
            screen: CreateNewGameStack,
            navigationOptions: {
                drawerLabel: 'Create New Game'
            }
        },
    },
    {
        contentComponent: Menu
    }

);

const AppContainer = createAppContainer(MenuNavigator);
export default AppContainer;