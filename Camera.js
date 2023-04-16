import React, { useState, useEffect, useRef, useContext } from "react";
import { Camera } from "expo-camera";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { CamContext } from "./Provider";

export default function Camera1() {
  const context = useContext(CamContext);

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedPhoto(photo);
    }
  };

  const savePhoto = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Quyền truy cập thư viện hình ảnh bị từ chối!");
      return;
    }
    // Permission granted, call ExpoMediaLibrary.saveToLibraryAsync
    await MediaLibrary.saveToLibraryAsync(capturedPhoto.uri);
    setCapturedPhoto(null);
  };

  const switchCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const toggleFlashMode = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        flashMode={flashMode}
        ref={cameraRef}
      >
        <View style={styles.cameraActions}>
          <TouchableOpacity
            style={styles.cameraAction}
            onPress={toggleFlashMode}
          >
            {flashMode === Camera.Constants.FlashMode.off ? (
              <MaterialIcons name="flash-off" size={24} color="white" />
            ) : (
              <MaterialIcons name="flash-on" size={24} color="white" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cameraAction, styles.qrCodeScanner]}
            onPress={context.toggleCam}
          >
            <MaterialIcons name="qr-code" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraAction} onPress={takePhoto}>
            <MaterialIcons name="camera" size={60} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cameraAction}
            onPress={switchCameraType}
          >
            {type === Camera.Constants.Type.back ? (
              <MaterialIcons name="camera-front" size={24} color="white" />
            ) : (
              <MaterialIcons name="camera-rear" size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </Camera>

      {capturedPhoto && (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: capturedPhoto.uri }}
            style={styles.previewImage}
          />
          <View style={styles.previewActions}>
            <TouchableOpacity style={styles.previewAction} onPress={savePhoto}>
              <Text style={styles.previewActionText}>Lưu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.previewAction}
              onPress={() => setCapturedPhoto(null)}
            >
              <Text style={styles.previewActionText}>Chụp lại</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
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
  qrCodeScanner: {
    position: "absolute",
    left: 330,
    right: 0,
    top: 50,
  },
  previewContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  previewImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  previewActions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  previewAction: {
    padding: 10,
    marginLeft: 10,
    backgroundColor: "gray",
    borderRadius: 8,
  },
  previewActionText: {
    color: "white",
    fontWeight: "bold",
  },
});
