import { useRef } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { Background } from "./src/components/Background";
import * as Notifications from "expo-notifications";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { Subscription } from "expo-modules-core";
import { Routes } from "./src/routes";
import { Loading } from "./src/components/Loading";
import "./src/services/notificationConfigs";
import { useEffect } from "react";
import { getPushNotificationToken } from "./src/services/getPushNotificationToken";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  }, []);

  useEffect(() => {
    getNotificationListener.current =
      Notifications.addNotificationReceivedListener((not) => console.log(not));

    responseNotificationListener.current =
      Notifications.addNotificationResponseReceivedListener((not) =>
        console.log(not)
      );

      return ()=> {
        if(getNotificationListener.current && responseNotificationListener.current){
          Notifications.removeNotificationSubscription(getNotificationListener.current)
          Notifications.removeNotificationSubscription(responseNotificationListener.current)
        }
      }
  }, []);

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
