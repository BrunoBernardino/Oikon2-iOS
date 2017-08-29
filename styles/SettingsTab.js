import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');
const smaller = (window.width <= 320);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  scrollView: {
    margin: 20,
  },
  scrollViewContent: {
  },
  logoContainer: {
    marginTop: smaller ? 50 : 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 10
  },
  dataButtonsContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    flex: 0.5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  buttonText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    fontSize: smaller ? 16 : 20,
    color: 'white',
    textAlign: 'center',
  },
  deleteButtonContainer: {
    marginTop: 50,
    marginBottom: 10,
    marginLeft: 50,
    marginRight: 50,
  },
  deleteButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  deleteButtonText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    fontSize: smaller ? 16 : 20,
    color: '#CC0000',
    textAlign: 'center',
  }
});

export default styles;
