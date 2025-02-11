import { View } from "react-native";
import MainDrawerNavigator from "@/navigations/drawer/MainDrawerNavigator";
import AuthStackNavigator from "@/navigations/stack/AuthStackNavigator";
function RootNavigator() {

  const isLoggedIn = false;
  return (
    <>
      {isLoggedIn ? <MainDrawerNavigator /> : <AuthStackNavigator />}
    </>
  )
} 

export default RootNavigator;