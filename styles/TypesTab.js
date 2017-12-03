import { StyleSheet } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: isIphoneX() ? 30 : 0,
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    borderBottomWidth: 1,
  },
  listContainer: {
    flex: 0.9,
    backgroundColor: 'transparent',
    marginBottom: 50,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginLeft: 40,
    marginRight: 40,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  }
});

export default styles;
