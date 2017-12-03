import { StyleSheet } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: isIphoneX() ? 60 : 0,
  },
  scrollView: {
    margin: 20,
  },
  scrollViewContent: {
  },
  logoContainer: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addExpenseText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    padding: 10,
  }
});

export default styles;
