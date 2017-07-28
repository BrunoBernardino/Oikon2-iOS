import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  nextText: {
    flex: 0.3,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    fontSize: 16,
    color: '#1F86FF',
    textAlign: 'right',
    padding: 10,
  },
  saveText: {
    flex: 0.4,
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    fontSize: 16,
    color: '#1F86FF',
    textAlign: 'center',
    padding: 10,
  },
  cancelText: {
    flex: 0.3,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    fontSize: 16,
    color: '#1F86FF',
    textAlign: 'left',
    padding: 10,
  },
});

export default styles;
