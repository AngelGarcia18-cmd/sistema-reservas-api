import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { editarEvento } from "../services/api";

export default function EditEventoScreen({ route, navigation }) {
    const { evento } = route.params;

    const [nombre, setNombre] = useState(evento.nombre);
    const [descripcion, setDescripcion] = useState(evento.descripcion);
    const [fechaInicio, setFechaInicio] = useState(evento.fechaInicio);
    const [fechaFin, setFechaFin] = useState(evento.fechaFin);
    const [lugar, setLugar] = useState(evento.lugar);
    const [cuposDisponibles, setCuposDiscponibles] = useState(evento.cuposDisponibles);
    const [estado, setEstado] = useState(evento.estado);

    const handleEditar = async () => {
        const res = await editarEvento(evento._id, {
            nombre,
            descripcion,
            fechaInicio,
            fechaFin,
            lugar,
            cuposDisponibles: Number(cuposDisponibles),
            estado
        });

        if (res && !res.error) {
            alert("Evento actualizado");
            navigation.goBack();
        } else {
            alert("Error al editar");
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Nombre</Text>
            <TextInput value={nombre} onchangeText={setNombre} style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    marginBottom: 10
                }} />
            
            <Text>Descripción</Text>
            <TextInput value={descripcion} onChangeText={setDescripcion} style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    marginBottom: 10
                }} />

            <Text>Fecha Inicio</Text>
            <TextInput value={fechaInicio} onChangeText={setFechaInicio} style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    marginBottom: 10
                }} />

            <Text>Fecha Fin</Text>
            <TextInput value={fechaFin} onChangeText={setFechaFin} style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    marginBottom: 10
                }} />

            <Text>Lugar</Text>
            <TextInput value={lugar} onChangeText={setLugar} style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    marginBottom: 10
                }} />

            <Text>Cupos</Text>
            <TextInput value={cuposDisponibles} onChangeText={setCuposDiscponibles} keyboardType="numeric" style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    marginBottom: 10
                }} />

            <Text>Estado</Text>
            <TextInput value={estado} onChangeText={setEstado} style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    marginBottom: 10
                }} />

            <Button title="Guardar cambios" onPress={handleEditar} />
        </View>
    );
}