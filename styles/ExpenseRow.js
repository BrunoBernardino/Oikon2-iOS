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
    flexDirection: 'row',
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
  },
  singleName: {
    flex: 0.5,
    fontFamily: 'HelveticaNeue',
    lineHeight: smaller ? 50 : 65,
    fontWeight: '300',
    fontSize: smaller ? 26 : 30,
    color: 'white',
    textAlign: 'left',
    paddingLeft: 10,
  },
  name: {
    flex: 1,
    fontFamily: 'HelveticaNeue',
    lineHeight: smaller ? 26 : 30,
    fontWeight: '300',
    fontSize: smaller ? 26 : 30,
    color: 'white',
    textAlign: 'left',
    paddingLeft: 10,
    /* This fixes things like a "g" being cut-off vertically */
    paddingTop: smaller ? -15 : -5,
    marginTop: smaller ? 7 : 10,
  },
  type: {
    flex: 1,
    fontFamily: 'HelveticaNeue',
    fontWeight: '300',
    fontSize: smaller ? 10 : 12,
    color: 'white',
    textAlign: 'left',
    paddingLeft: 10,
    marginBottom: smaller ? -8 : -5,
  },
  date: {
    flex: 0.2,
    fontFamily: 'HelveticaNeue',
    lineHeight: smaller ? 50 : 65,
    fontWeight: '300',
    fontSize: smaller ? 12 : 15,
    color: 'white',
    textAlign: 'right',
    paddingLeft: 5,
    paddingRight: 5,
  },
  cost: {
    flex: 0.3,
    fontFamily: 'HelveticaNeue',
    lineHeight: smaller ? 50 : 65,
    fontWeight: '300',
    fontSize: smaller ? 22 : 26,
    color: 'white',
    textAlign: 'right',
    paddingRight: 10,
  },
});

export default styles;
