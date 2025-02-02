import {StyleSheet, View} from 'react-native';
import { mainNavigations } from '@/constants';
import { createDrawerNavigator } from '@react-navigation/drawer';   
import DiaryStackNavigator from '../stack/DiaryStackNavigator';

export type MainDrawerParamList = {
    [mainNavigations.HOME]: undefined;
}

const Drawer = createDrawerNavigator<MainDrawerParamList>();

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator>
        <Drawer.Screen name={mainNavigations.HOME} component={DiaryStackNavigator} />
    </Drawer.Navigator>
  )
}
const styles = StyleSheet.create({});

export default MainDrawerNavigator;