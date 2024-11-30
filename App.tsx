import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from './src';
import rnConstants from './@library/config/rn-constants';

export default function App() {
  return (
    <SafeAreaProvider style={{ paddingTop: 60, paddingBottom: 40, backgroundColor: rnConstants.WHITE_COLOR }}>
      <Main />
    </SafeAreaProvider>
  );
}
