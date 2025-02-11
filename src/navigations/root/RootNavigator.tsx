import { View } from "react-native";
import MainDrawerNavigator from "@/navigations/drawer/MainDrawerNavigator";
import AuthStackNavigator from "@/navigations/stack/AuthStackNavigator";
import useAuth from "@/hooks/queries/useAuth";
function RootNavigator() {
  const {isAuthenticated, isLoginLoading} = useAuth();
  return (
    <>
      {isAuthenticated ? <MainDrawerNavigator /> : <AuthStackNavigator />}
    </>
  )
} 

export default RootNavigator;