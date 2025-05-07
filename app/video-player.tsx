import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function VideoPlayer() {
  const { url } = useLocalSearchParams<{ url: string }>();

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: url }}
        style={styles.webview}
        allowsFullscreenVideo
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  webview: { flex: 1 },
});
