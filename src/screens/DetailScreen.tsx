import React from "react";
import { ScrollView, Image, Text, View, Linking } from "react-native";
import { Card, Button } from "react-native-paper"; // Importa Button de react-native-paper
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/Navigation";

export default function DetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "Detail">>();
  const { news } = route.params;

  const handleReadMore = () => {
    Linking.openURL(news.url); // Abre la URL de la noticia en el navegador
  };

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
          <Text style={{ marginTop: 10 }}>
            {news.content ||
              "El contenido completo de la noticia no está disponible."}
          </Text>
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>
            Autor: {news.author || "Desconocido"}
          </Text>
          <Text style={{ marginTop: 5, fontWeight: "bold" }}>
            Fuente: {news.source.name}
          </Text>
          {/* Botón para leer más */}
          <Button
            mode="contained"
            onPress={handleReadMore}
            style={{ marginTop: 30 }}
          >
            Leer más
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
