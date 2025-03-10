import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { NewsItemType } from "../types/News";

interface Props {
  news: NewsItemType;
  onPress: () => void;
}

export default function NewsItem({ news, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
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
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
            {news.title}
          </Text>
          <Text style={{ marginTop: 5 }}>{news.description}</Text>
          <Text style={{ marginTop: 5, color: "gray" }}>
            {new Date(news.publishedAt).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}
