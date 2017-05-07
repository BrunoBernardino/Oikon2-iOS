import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');
const smaller = (window.width <= 320);

const height = smaller ? 60 : 80;

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
    height: height,
    flex: 0.2,
    borderLeftColor: 'white',
    borderLeftWidth: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.01)'
  },
  label: {
    fontFamily: 'HelveticaNeue',
    lineHeight: height,
    fontWeight: '300',
    fontSize: smaller ? 16 : 20,
    color: 'white',
    textAlign: 'left',
    paddingLeft: 10,
  },
  input: {
    height: height,
    flex: 0.8,
    fontFamily: 'HelveticaNeue',
    fontWeight: '100',
    fontSize: smaller ? 42 : 50,
    color: 'white',
    textAlign: 'right',
    paddingRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.01)'
  },
  smallInput: {
    height: height,
    flex: 0.8,
    fontFamily: 'HelveticaNeue',
    fontWeight: '100',
    fontSize: smaller ? 26 : 30,
    color: 'white',
    textAlign: 'right',
    paddingRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.01)'
  },
});

export default styles;
