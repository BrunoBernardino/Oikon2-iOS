import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');
const smaller = (window.width <= 320);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: smaller ? 50 : 65,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  oddContainer: {
    flex: 1,
    height: smaller ? 50 : 65,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  },
  nameGroup: {
    flex: 0.5,
    flexDirection: 'column',
    marginTop: 5
  },
  name: {
    flex: 1,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    lineHeight: smaller ? 26 : 30,
    fontSize: smaller ? 26 : 30,
    color: 'white',
    textAlign: 'left',
    paddingLeft: 10,
    /* This fixes things like a "g" being cut-off vertically */
    paddingTop: smaller ? -10 : -5,
    marginTop: smaller ? 2 : 5,
  },
  count: {
    flex: 1,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    fontSize: smaller ? 10 : 12,
    color: 'white',
    textAlign: 'left',
    paddingLeft: 10,
    marginBottom: smaller ? -8 : -5,
  },
  cost: {
    flex: 0.5,
    fontFamily: 'Helvetica Neue',
    lineHeight: smaller ? 50 : 65,
    fontWeight: '300',
    fontSize: smaller ? 22 : 26,
    color: 'white',
    textAlign: 'right',
    paddingRight: 10,
  },
});

export default styles;
