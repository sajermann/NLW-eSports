import { Text, TouchableOpacity, View, ViewProps } from "react-native";
import { THEME } from "../../theme";
import { styles } from "./styles";
import { DouInfo } from "../DuoInfo";
import {GameController} from 'phosphor-react-native'

export interface DuoCardProps {
  hourEnd: string;
  hourStart: string;
  id: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface PropsData {
  data: DuoCardProps;
  onConnect: ()=>void
}

export function DuoCard({ data, onConnect }: PropsData) {
  const {
    hourEnd,
    hourStart,
    id,
    name,
    useVoiceChannel,
    weekDays,
    yearsPlaying,
  } = data;
  return (
    <View style={styles.container}>
      <DouInfo label="Nome" value={name} />
      <DouInfo label="Tempo de jogo" value={`${yearsPlaying} ano(s)`} />
      <DouInfo
        label="Disponibilidade"
        value={`${weekDays.length} dias \u2022 ${hourStart} - ${hourEnd}`}
      />
      <DouInfo
        label="Chamada de áudio?"
        value={useVoiceChannel ? "Sim" : "Não"}
        colorValue={useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />

      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController color={THEME.COLORS.TEXT} size={20} />
        <Text style={styles.buttonTitle}>
          Conectar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
