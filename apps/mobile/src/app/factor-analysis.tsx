import { StatusBar } from 'react-native';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Navigation, FactorAnalysis } from '@heelix/shared/src/index';

export default function FactorAnalysisScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <StatusBar barStyle="dark-content" />
      <Navigation onNavigate={(path) => router.push(path)} />
      <FactorAnalysis />
    </View>
  );
}
