import { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Heading } from "../../components/Heading";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Background } from "../../components/Background";
import logoImg from "../../assets/logo-nlw-esports.png";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GameParams } from "../../@types/navigation";
import { Entypo } from "@expo/vector-icons";
import { THEME } from "../../theme";
import { styles } from "./styles";
import logo from "../../assets/logo-nlw-esports.png";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const route = useRoute();
  const game = route.params as GameParams;
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`http://192.168.15.4:3333/games/${game.id}/ads`)
      .then((resp) => resp.json())
      .then((data) => setDuos(data));
  }, []);

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={logo} style={styles.logo} />
          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.banner }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar" />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => {}} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[
            duos.length > 0 ? styles.contentList : styles.emptyListContent,
          ]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}
