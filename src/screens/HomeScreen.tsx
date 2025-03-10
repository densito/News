import React, { useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { fetchNews } from "../store/newsSlice";
import NewsItem from "../components/NewsItem";
import { RootState, AppDispatch } from "../store/store";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/Navigation";

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { news, status, error } = useSelector((state: RootState) => state.news);
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Home">>();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleRefresh = async () => {
    setRefreshing(true); // Activa la animación de carga
    await dispatch(fetchNews()); // Vuelve a cargar las noticias
    setRefreshing(false); // Desactiva la animación de carga
  };

  if (status === "loading") {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (status === "failed") {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      <FlatList
        data={news}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <NewsItem
            news={item}
            onPress={() => navigation.navigate("Detail", { news: item })}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing} // Estado de la animación de carga
            onRefresh={handleRefresh} // Función que se ejecuta al deslizar
            colors={["#0000ff"]} // Color de la animación (opcional)
            tintColor="#0000ff" // Color del ícono de carga (opcional)
          />
        }
      />
    </View>
  );
}
