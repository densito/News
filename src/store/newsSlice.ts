// src/store/newsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NewsItemType } from "../types/News";
import Constants from "expo-constants";

interface NewsState {
  news: NewsItemType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NewsState = {
  news: [],
  status: "idle",
  error: null,
};

const apiKey = Constants.expoConfig?.extra?.newsApiKey;
const today = new Date().toISOString().split("T")[0];

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=us&from=${today}&apiKey=${apiKey}`
  );
  return response.data.articles;
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error fetching news";
      });
  },
});

export default newsSlice.reducer;
