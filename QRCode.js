import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CamContext } from "./Provider";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Linking from "expo-linking";

export default function QRCode() {
  const context = useContext(CamContext);

  const [hasPermissionQR, setHasPermissionQR] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermissionQR(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setResult(data);
    Linking.openURL(data);
  };

  if (hasPermissionQR === null) {
    return <Text>Đang xin cấp quyền truy cập máy ảnh...</Text>;
  }
  if (hasPermissionQR === false) {
    return <Text>Không có quyền truy cập máy ảnh</Text>;
  }

  return (
    <View style={styles.containerQR}>
      {scanned ? (
        <View>
          <Text style={styles.scanResultText}>Kết quả quét mã QR:</Text>
          <Text style={styles.scanResult}>{result}</Text>
          <Button title="Quét lại" onPress={() => setScanned(false)} />
        </View>
      ) : (
        <View style={styles.barcodeScannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.cameraActions}>
            <TouchableOpacity
              style={styles.cameraAction}
              onPress={context.toggleCam}
            >
              <MaterialIcons name="camera-enhance" size={60} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerQR: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  barcodeScannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  scanResultText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scanResult: {
    fontSize: 16,
    marginBottom: 20,
  },
  cameraActions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "flex-end",
  },
  cameraAction: {
    alignSelf: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
});
