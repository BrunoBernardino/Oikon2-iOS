import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  oddContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  label: {
    flex: 0.3,
    fontFamily: 'HelveticaNeue',
    fontWeight: '500',
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
    padding: 10,
    height: 40,
    lineHeight: 30,
    marginVertical: 0,
  },
  input: {
    flex: 0.7,
    fontFamily: 'HelveticaNeue',
    fontWeight: '300',
    fontSize: 20,
    color: 'black',
    textAlign: 'right',
    padding: 10,
    height: 40,
    lineHeight: 30,
    marginVertical: 0,
  }
});

export default styles;
