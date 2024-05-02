// HomeScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Button,
  Modal,
  Platform,
  FlatList,
  StatusBar,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { ProductList } from "../Action";
import Menu from "./Menu"; // Import the menu component

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState("");
  const [selectedImage, setSelectedImage] = useState([]);
  const [datalist, setdatalist] = useState();

  const { data, isPending } = useQuery({
    queryKey: ["ProductList"],
    queryFn: () => ProductList(),
  });

  useEffect(() => {
    if (data) setdatalist(data?.data?.data);
  });

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await localStorage.getItem("loggedIn");
        if (loggedIn === "true") {
          navigation.navigate("Main", { screen: "Home" });
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const profile = () => {
    navigation.navigate("Login");
  };

  const handlePickImage = () => {
    // Implement image picking logic here
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...selectedImage];
    updatedImages.splice(index, 1);
    setSelectedImage(updatedImages);
  };

  const handleSubmitModal = () => {
    // Implement submission logic here
  };

  return (
    <View style={styles.container}>
      <Menu navigation={navigation} /> {/* Include the menu component */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>SNEAKERS-Shop</Text>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </ScrollView>
      <ScrollView style={styles.ListData}>
        <FlatList
          data={datalist}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item) => item?.catid}
        />
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.keyboardAvoidingView}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addButton}
        >
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Modal content */}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  ListData: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
    alignItems: "center",
  },
  searchBar: {
    width: "100%",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  keyboardAvoidingView: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 999,
  },
  addButton: {
    backgroundColor: "#007BFF",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    color: "#fff",
    fontSize: 24,
  },
});

export default HomeScreen;
