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
    borderTopWidth: 1
  },
  closeText: {
    fontFamily: 'HelveticaNeue',
    fontWeight: '300',
    fontSize: 16,
    color: '#1F86FF',
    textAlign: 'right',
    padding: 10,
  },
  headerGroup: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },
  nextText: {
    flex: 0.3,
    fontFamily: 'HelveticaNeue',
    fontWeight: '300',
    fontSize: 16,
    color: '#1F86FF',
    textAlign: 'right',
    padding: 10,
  },
  saveText: {
    flex: 0.4,
    fontFamily: 'HelveticaNeue',
    fontWeight: '400',
    fontSize: 16,
    color: '#1F86FF',
    textAlign: 'center',
    padding: 10,
  },
  cancelText: {
    flex: 0.3,
    fontFamily: 'HelveticaNeue',
    fontWeight: '300',
    fontSize: 16,
    color: '#1F86FF',
    textAlign: 'left',
    padding: 10,
  },
  picker: {
    backgroundColor: 'white'
  },
});

export default styles;
