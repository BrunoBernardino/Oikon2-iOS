import { StyleSheet } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: isIphoneX() ? 30 : 0,
  },
  headerContainer: {
    flex: 0.2,
    backgroundColor: 'transparent',
  },
  listContainer: {
    flex: 0.8,
    backgroundColor: 'transparent',
    marginBottom: 50,
  },
});

export default styles;
