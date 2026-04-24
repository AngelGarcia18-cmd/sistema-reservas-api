import { useRef, useState } from "react";
import { Animated, Button, Text, View } from "react-native";

export default function EventoCard({ item, navigation, confirmarEliminacion }) {
    const [expandido, setExpandido] = useState(false);

    const alturaAnimada = useRef(new Animated.Value(0)).current;

    const toggleExpandir = () => {
        const toValue = expandido ? 0: 1;

        Animated.timing(alturaAnimada, {
            toValue,
            duration: 300,
            useNativeDriver: false,
        }).start();

        setExpandido(!expandido)
    };

    const altura = alturaAnimada.interpolate({
        inputRange: [0, 1],
        outputRange: [0,60],
    });

    return (
        <View style={{
            backgroundColor: "#fff",
            padding: 15,
            borderRadius: 12,
            marginTop: 10,
            elevation: 3
        }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {item.nombre}
            </Text>

            <Text>📍 {item.lugar}</Text>
            <Text>📆 {item.fechaInicio}</Text>

            <Animated.View style={{ overflow: "hidden", height: altura }}>
                    <Text>📝 {item.descripcion}</Text>
                    <Text>👥 Cupos: {item.cuposDisponibles}</Text>
                    <Text>📌 Estado: {item.estado}</Text>
            </Animated.View>

            <Button
                title={expandido ? "Ver menos" : "Ver más"}
                onPress={toggleExpandir}
            />
        </View>
    );
}