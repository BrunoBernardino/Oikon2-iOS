import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 20
  },
  labelContainer: {
    height: 80,
    flex: 0.2,
    borderLeftColor: 'white',
    borderLeftWidth: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.01)'
  },
  label: {
    fontFamily: 'HelveticaNeue',
    lineHeight: 80,
    fontWeight: '300',
    fontSize: 20,
    color: 'white',
    textAlign: 'left',
    paddingLeft: 10,
  },
  input: {
    height: 80,
    flex: 0.8,
    fontFamily: 'HelveticaNeue',
    fontWeight: '100',
    fontSize: 50,
    color: 'white',
    textAlign: 'right',
    paddingRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.01)'
  },
  smallInput: {
    height: 80,
    flex: 0.8,
    fontFamily: 'HelveticaNeue',
    fontWeight: '100',
    fontSize: 30,
    color: 'white',
    textAlign: 'right',
    paddingRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.01)'
  },
});

export default styles;
