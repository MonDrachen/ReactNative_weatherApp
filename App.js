import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider, TextInput, Button, ActivityIndicator, Card, Modal, Portal} from 'react-native-paper';

export default function App() {
  const [location, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [userApi, setUserApi] = useState({});

  const access_key = '8d249f937842a9e12996409facdb77b2';

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const handleClick = async () => {
    setLoading(true);
    setUserApi({});

    try {
      const response = await fetch(`http://api.weatherstack.com/current?access_key=${access_key}&query=${location}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      setUserApi(result);
    } 
    catch (err) {
      setErr(err.message);
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Weather App</Text>
        <TextInput
          style={styles.input}
          label="Ingresa la ciudad (inglés)"
          value={location}
          onChangeText={valorIngresado => setText(valorIngresado)}
        />
        <Button style={styles.button} icon="map-search" mode="contained" onPress={handleClick}>
          Buscar
        </Button>

        {loading && <ActivityIndicator size="large" />}
        {err && <h2>{err}</h2>}

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.infolabel}>Temperatura Actual:</Text>
            <Text style={styles.info}>{userApi?.current?.temperature}°C</Text>
            <Text style={styles.infolabel}>Hora de Observación (UTC):</Text>
            <Text style={styles.info}>{userApi?.current?.observation_time}</Text>
          </Card.Content>
          <Card.Cover style={styles.card} source={userApi?.current?.weather_icons} />
        </Card>

        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Text>La clase de React Native fue una de mis favoritas, no sólo porque el contenido me pareció interesante, sino también por la 
              forma en la que se desarrolló; la cual fue trabajando todos al mismo tiempo y resolviendo dudas en el momento, con el propósito
              de que nadie se quedara atrás. Finalmente, creo que React Native es una herramienta muy poderosa, ya que permite el desarrollo 
              de aplicaciones para iOS y Android de forma sencilla. 
            </Text>
          </Modal>
        </Portal>
        <Button style={styles.button} icon="brain" mode="contained" onPress={showModal}>
          Reflexión
        </Button>

    </View>
  </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 60,
    marginHorizontal: 30,
  },
  title: {
    color: '#D2B48C',
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 20,
  },
  infolabel: {
    color: '#D2B48C',
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  info: {
    color: '#D2B48C',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 30,
    backgroundColor: '#F4A460', 
  },
  input: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: '#FFF5EE',
  },
  card: {
    borderRadius: 20,
  },
});
