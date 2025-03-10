import React from "react";
import { ScrollView, Image, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/Navigation"; // Importa los tipos de navegación

export default function DetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "Detail">>();
  const { news } = route.params;

  return (
    <ScrollView>
      <Card style={{ margin: 10 }}>
        <Card.Content>
          {news.urlToImage ? (
            <Image
              source={{ uri: news.urlToImage }}
              style={{ width: "100%", height: 200 }}
            />
          ) : (
            <View
              style={{
                width: "100%",
                height: 200,
                backgroundColor: "#e0e0e0",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No hay imagen disponible</Text>
            </View>
          )}
          <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>
            {news.title}
          </Text>
          <Text style={{ marginTop: 5, color: "gray" }}>
            {new Date(news.publishedAt).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
          <Text style={{ marginTop: 10 }}>{news.content}</Text>
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>
            Autor: {news.author}
          </Text>
          <Text style={{ marginTop: 5, fontWeight: "bold" }}>
            Fuente: {news.source.name}
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
