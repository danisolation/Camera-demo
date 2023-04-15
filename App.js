import React, { useState } from "react";
import { CamProvider } from "./Provider";
import { StyleSheet, View } from "react-native";
import Merge from "./Merge";

export default function App() {
  return (
    <CamProvider>
      <View style={styles.container}>
        <Merge />
      </View>
    </CamProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
