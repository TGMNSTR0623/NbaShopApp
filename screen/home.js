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
  SafeAreaView ,
  Animated,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { ProductList } from "../Action";
import Loading from "./Components/Loading"
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState("");
  const [selectedImage, setSelectedImage] = useState([]);
  const [datalist, setdatalist] = useState();
  const [isopen, setIsOpen] = useState(false);
  const [drawerAnim] = useState(new Animated.Value(0));
  const [selectedId, setSelectedId] = useState();

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

  const toggleDrawer = () => {
    setIsOpen(!isopen);
    Animated.timing(drawerAnim, {
      toValue: isopen ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const renderItem = ({ item }) => {
    const backgroundColor = item.product_id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <TouchableOpacity
        onPress={() => setSelectedId(item.product_id)} 
        style={[styles.item, { backgroundColor }]}>
        <Text style={[styles.itemText, { color }]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View colors={['#FFF', '#E0E0E0']} style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={toggleDrawer}
      >
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>
      <Animated.ScrollView
        style={[styles.drawer, {
          left: drawerAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-200, 0],
          })
        }]}
      >
        <Button
          style={styles.modalButtonSub}
          title="drawer close"
          onPress={toggleDrawer}
        />
      </Animated.ScrollView>
      <TouchableOpacity
        style={styles.CardButton}
      >
        <MaterialCommunityIcons name="cart-variant" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.title}>SNEAKERS-Shop</Text>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
          />

        </ScrollView>
        <SafeAreaView >
          <FlatList
            data={datalist}
            renderItem={renderItem}
            extraData={selectedId}

            keyExtractor={(item) => item?.catid}
          />
        </SafeAreaView>
      </ScrollView>




      <Loading isLoading={isPending} />

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
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.modalInput}
              placeholder="Write a task"
              value={task}
              onChangeText={(text) => setTask(text)}
            />
            <TouchableOpacity onPress={handlePickImage}>
              <View style={styles.modalButton}>
                <FontAwesome name="image" size={24} color="black" />
              </View>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              {selectedImage.map((image, idx) => (
                <View key={idx} style={styles.uploadedImageContainer}>
                  <Image
                    source={{ uri: image.uri }}
                    style={styles.uploadedImage}
                  />
                  <TouchableOpacity onPress={() => handleDeleteImage(idx)}>
                    <FontAwesome name="trash" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <Button
              style={styles.modalButtonSub}
              title="Submit"
              onPress={handleSubmitModal}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 200,
    backgroundColor: '#FFF',
    zIndex: 1000,
  },
  scrollViewContent: {
    marginTop: 20,
    flexGrow: 1,
    alignItems: "center",
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 18,
  },
  searchBar: {
    width: "90%",
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalInput: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
  },
  modalButtonSub: {
    width: 10,

    marginBottom: 10,
    backgroundColor: "#2c69d3",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButton: {
    marginBottom: 10,
    backgroundColor: "#F0F0F0",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  menuButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 999,
  },
  CardButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 999,
  },
  menuText: {
    fontSize: 24,
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
