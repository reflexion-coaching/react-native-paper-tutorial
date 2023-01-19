import { TouchableOpacity } from 'react-native';
import { Card, Text, View } from 'react-native-paper';

const title = "Titre 1"

const content = "Content of Card 1"

const HomeScreen = ({ navigation }) => (
    <TouchableOpacity
      onPress={() =>
        navigation?.push('Details', {
          title,
          content,
        })
      }
    >
      <Card>
        <Card.Content>
          <Text variant="titleLarge">{title}</Text>
          <Text variant="bodyMedium">{content}</Text>
        </Card.Content>
      </Card>
      
    </TouchableOpacity>
  );

export default HomeScreen;