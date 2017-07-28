import { StyleSheet } from 'react-native';

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
