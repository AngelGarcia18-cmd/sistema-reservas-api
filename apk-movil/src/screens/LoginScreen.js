import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { loginUsuario } from "../services/api";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Todos los campos son oblgatorios");
            return;
        }

        const res = await loginUsuario(email, password);

        if(res?.token) {
            await AsyncStorage.setItem("token", res.token);
            await AsyncStorage.setItem("rol", res.rol);

            alert("Login exitoso");
            console.log("NAVENGANDO A EVENTOS");
            console.log("RESPUESTA LOGIN:", res);
            navigation.navigate("Eventos");
        } else {
            alert(res?.msg || "Error al iniciar sesión");
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                style={{ borderWidth: 1, marginBottom: 10 }}
            />

            <Text>Contraseña</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                style={{ borderWidth: 1, marginBottom: 10 }}
            />

            <Button title="Iniciar sesión" onPress={handleLogin} />
        </View>
    );
}