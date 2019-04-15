import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import HomeScreen from './view/HomeScreen';
import CreateGameScreen from './view/CreateGameScreen';
import MyGamesScreen from './view/MyGamesScreen';
import MyGameScreen from './view/MyGameScreen';

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

const MyGamesStack = createStackNavigator(
    {
        MyGames: MyGamesScreen,
        MyGame: MyGameScreen
    }
)

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
        MyGames: {
            screen: MyGamesStack,
            navigationOptions: {
                drawerLabel: 'My Games'
            }
        },
    },
    {
        contentComponent: Menu
    }

);

const AppContainer = createAppContainer(MenuNavigator);
export default AppContainer;