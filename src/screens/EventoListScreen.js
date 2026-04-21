import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Alert, Button, FlatList, StyleSheet, View } from "react-native";
import EventoCard from "../componentes/EventoCard";
import { eliminarEvento, getEventos } from "../services/api";

export default function EventoListScreen({ navigation }) {
    const [eventos, setEventos] = useState([]);

    const cargarEventos = async () => {
        const data = await getEventos();
        setEventos(data || []);
    };

    const handleEliminar = async (id) => {
        const res = await eliminarEvento(id);

        if (res && !res.error) {
            alert("Evento eliminado");
            cargarEventos();
        } else {
            alert("Error al eliminar");
        }
    };

    const confirmarEliminación = (id) => {
        Alert.alert(
            "¿Eliminar evento?",
            "Esta acción no se puede deshacer",
            [
                {text: "Cancelar", style: "cancel"},
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: () => handleEliminar(id)
                }
            ]
        );
    };

    const handleLogout = () => {
        Alert.alert(
            "Cerrar sesión",
            "¿Seguro que quieres salir?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Salir",
                    style: "destructive",
                    onPress: async () => {
                        await AsyncStorage.removeItem("token");
                        await AsyncStorage.removeItem("rol");

                        navigation.reset({
                            index: 0,
                            routes: [{ name: "Login" }],
                        });
                    },
                },
            ]
        );
    };

    useFocusEffect(
        useCallback(() => {
            cargarEventos();
        }, [])
    );

    return (
        <View style={{ padding: 20 }}>
            <View style={{ marginBottom: 10 }}>
                <Button title="🚪 Cerrar sesión"
                onPress={handleLogout} />
            </View>
            <View style={{ marginBottom: 10 }}>
                <Button
                    title="Crear Evento"
                    onPress={() => navigation.navigate("Crear")}
                />
            </View>

            <FlatList
                data={eventos}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <EventoCard
                            item={item}
                            navigation={navigation}
                            confirmarEliminacion={confirmarEliminación}
                        />
                        <View style={styles.botones}>
                            <Button
                                title="Editar"
                                onPress={() => navigation.navigate("Editar", { evento: item })}
                            />
                            <Button
                                title="Eliminar"
                                color="#e74c3c"
                                onPress={() => confirmarEliminación(item._id)}
                            />
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        marginTop: 10,
        elevation: 3
    },

    titulo: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5
    },

    texto: {
        fontSize: 14,
        color: "#555"
    },

    botones: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    }
});