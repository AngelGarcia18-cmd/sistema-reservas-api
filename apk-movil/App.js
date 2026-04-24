import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateEventoScreen from "./src/screens/CreateEventoScreen";
import EditEventoScreen from "./src/screens/EditEventoScreen";
import EventoListScreen from "./src/screens/EventoListScreen";
import LoginScreen from "./src/screens/LoginScreen";




const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Eventos" component={EventoListScreen} />
        <Stack.Screen name="Crear" component={CreateEventoScreen} />
        <Stack.Screen name="Editar" component={EditEventoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
