import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 65,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  oddContainer: {
    flex: 1,
    height: 65,
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
    fontFamily: 'HelveticaNeue',
    fontWeight: '300',
    fontSize: 30,
    color: 'white',
    textAlign: 'left',
    paddingLeft: 10
  },
  count: {
    flex: 1,
    fontFamily: 'HelveticaNeue',
    fontWeight: '300',
    fontSize: 12,
    color: 'white',
    textAlign: 'left',
    paddingLeft: 10,
    marginBottom: -5
  },
  cost: {
    flex: 0.5,
    fontFamily: 'HelveticaNeue',
    lineHeight: 65,
    fontWeight: '300',
    fontSize: 26,
    color: 'white',
    textAlign: 'right',
    paddingRight: 10,
  },
});

export default styles;
