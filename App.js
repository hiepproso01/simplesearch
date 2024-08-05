import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, Linking,Image, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchWithSerpAPI = async () => {
    const apiKey = 'YOUR_KEY_SERPAPI'; //Replace your serpapi key
    try {
      const response = await axios.get(`https://serpapi.com/search.json`, {
        params: {
          engine: 'google',
          q: query,
          api_key: apiKey,
        }
      });
      const data = response.data;
      if (data.organic_results && data.organic_results.length > 0) {
        setResults(data.organic_results);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#5f6368" style={styles.icon} />
        <TextInput
          placeholder="Search"
          value={query}
          onChangeText={text => setQuery(text)}
          style={styles.input}
        />
      </View>
      <Button title="Search" onPress={searchWithSerpAPI} color="#1a73e8" />
      <FlatList
        data={results}
        keyExtractor={item => item.link}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
              {/* {item.thumbnail ? (
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
            ) : null} */}
            <Text style={styles.resultTitle} onPress={() => Linking.openURL(item.link)}>
              {item.title}
            </Text>
            
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
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#5f6368',
  },
  resultItem: {
    paddingVertical: 10,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  resultTitle: {
    paddingTop:10,
    paddingBottom:10,
    fontSize: 20,
    color: '#1a0dab',
    fontWeight: 'bold',
    borderTopWidth:1,
    borderBottomColor:'gray',
    borderTopColor:'gray',
  },
});
export default App;
