import { useEffect, useState } from "react";
import { FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Heading } from "../../components/Heading";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Background } from "../../components/Background";
import logoImg from "../../assets/logo-nlw-esports.png";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    fetch("http://192.168.15.4:3333/games")
      .then((resp) => resp.json())
      .then((data) => setGames(data));
  }, []);

  function handleOpenGame({ id, title, banner }: GameCardProps) {
    navigation.navigate("game", { id, title, banner });
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre seu duo"
          subtitle="Selecione o game que deseja jogar..."
        />
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={()=>handleOpenGame(item)} />
          )}
          horizontal
          showsHorizontalScrollIndicator
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
