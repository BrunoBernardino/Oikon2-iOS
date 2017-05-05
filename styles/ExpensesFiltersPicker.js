import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },
  pane: {
    flex: 0.5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopColor: 'rgba(255, 255, 255, 0.8)',
    borderTopWidth: 1,
    marginTop: 20
  },
  headerGroup: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },
  closeText: {
    flex: 0.3,
    fontFamily: 'HelveticaNeue',
    fontWeight: '300',
    fontSize: 16,
    color: '#1F86FF',
    textAlign: 'right',
    padding: 10,
  },
  titleText: {
    flex: 0.4,
    fontFamily: 'HelveticaNeue',
    fontWeight: '400',
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    padding: 10,
  },
  clearText: {
    flex: 0.3,
    fontFamily: 'HelveticaNeue',
    fontWeight: '300',
    fontSize: 16,
    color: '#1F86FF',
    textAlign: 'right',
    padding: 10,
  },
  filtersGroup: {
    backgroundColor: 'white',
    paddingBottom: 20
  },
  filtersGroupTitle: {
    fontFamily: 'HelveticaNeue',
    fontWeight: '300',
    fontSize: 12,
    color: 'black',
    textAlign: 'left',
    paddingTop: 10,
    paddingLeft: 10
  },
  typeGroup: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },
  oddTypeGroup: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  type: {
    flex: 0.9,
    fontFamily: 'HelveticaNeue',
    fontWeight: '300',
    fontSize: 20,
    color: 'black',
    textAlign: 'left',
    padding: 10,
  },
  typeSwitch: {
    marginRight: 10,
    marginTop: 7,
  },
});

export default styles;
