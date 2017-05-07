import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');
const smaller = (window.width <= 320);

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
    fontSize: smaller ? 13 : 16,
    color: 'black',
    textAlign: 'left',
    padding: 10,
    height: smaller ? 36 : 40,
    lineHeight: smaller ? 26 : 30,
    marginVertical: smaller ? -5 : 0,
  },
  input: {
    flex: 0.7,
    fontFamily: 'HelveticaNeue',
    fontWeight: '300',
    fontSize: smaller ? 16 : 20,
    color: 'black',
    textAlign: 'right',
    padding: 10,
    height: smaller ? 36 : 40,
    lineHeight: smaller ? 26 : 30,
    marginVertical: smaller ? 0 : 5,
  }
});

export default styles;
