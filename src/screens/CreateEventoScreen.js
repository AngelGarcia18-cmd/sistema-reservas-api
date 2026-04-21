import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { crearEvento } from "../services/api";

export default function CreateEventoScreen({ navigation }) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [lugar, setLugar] = useState("");
    const [cuposDisponibles, setCuposDisponibles] = useState("");

    const handleCrear = async () => {
        if (!nombre || !descripcion || !fechaInicio || !fechaFin || !lugar || !cuposDisponibles) {
            alert("Todos los campos son obligatorios");
            return;
        }

        const res = await crearEvento({
            nombre,
            descripcion,
            fechaInicio,
            fechaFin,
            lugar,
            cuposDisponibles: Number(cuposDisponibles),
            estado: "activo"
        });

        console.log("RESPUESTA BACKEND:", res);

        await("Evento creado correctamente");
        navigation.goBack();
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Nombre</Text>
            <TextInput
                value={nombre}
                onChangeText={setNombre}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    marginBottom: 10
                }}
            />

            <Text>Descripción</Text>
            <TextInput
                value={descripcion}
                onChangeText={setDescripcion}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    marginBottom: 10
                }}
            />

            <Text>Fecha Inicio</Text>
            <TextInput
                value={fechaInicio}
                onChangeText={setFechaInicio}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    marginBottom: 10
                }}
            />

            <Text>Fecha Fin</Text>
            <TextInput
                value={fechaFin}
                onChangeText={setFechaFin}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    marginBottom: 10
                }}
            />

            <Text>Lugar</Text>
            <TextInput
                value={lugar}
                onChangeText={setLugar}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    marginBottom: 10
                }}
            />

            <Text>Cupos Disponibles</Text>
            <TextInput
                value={cuposDisponibles}
                onChangeText={setCuposDisponibles}
                keyboardType="numeric"
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    marginBottom: 10
                }}
            />

            <Button title="Crear Evento" onPress={handleCrear} />
        </View>
    );
}