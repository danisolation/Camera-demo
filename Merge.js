import React, { useContext } from "react";
import { CamContext } from "./Provider";
import { StyleSheet, View } from "react-native";
import Camera1 from "./Camera";
import QRCode from "./QRCode";

export default function Merge() {
  const context = useContext(CamContext);

  return (
    <View style={styles.container}>
      {context.cam == true ? <Camera1 /> : <QRCode />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
