import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

const baseUrl = 'https://selu383-sp24-p03-g07.azurewebsites.net'; 

const BookScreen = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [rooms, setRooms] = useState([]);

  const fetchHotels = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/hotels`);
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      Alert.alert('Error', 'Failed to fetch hotels. Please try again later.');
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleHotelSelection = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleDateSelection = (day) => {
    const selectedDay = { [day.dateString]: { selected: true } };
    if (Object.keys(selectedDates).length === 2) {
      setSelectedDates(selectedDay);
    } else {
      setSelectedDates({ ...selectedDates, ...selectedDay });
    }
  };

  const searchHotels = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/rooms/byhotel/${selectedHotel.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dates: Object.keys(selectedDates),
        }),
      });
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Error searching hotels:', error);
      Alert.alert('Error', 'Failed to search hotels. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Dates:</Text>
      <Calendar
        onDayPress={(day) => handleDateSelection(day)}
        markedDates={selectedDates}
        markingType={'period'}
      />
      <Text style={styles.header}>Select Hotel:</Text>
      <FlatList
        data={hotels}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.hotelItem, selectedHotel === item && styles.selectedHotel]}
            onPress={() => handleHotelSelection(item)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={searchHotels}>
        <Text style={styles.buttonText}>Search Hotels</Text>
      </TouchableOpacity>

      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.roomItem}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hotelItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#fcd34d',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedHotel: {
    backgroundColor: '#fcd34d',
  },
  roomItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

export default BookScreen;