import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  pane: {
    flex: 0.5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopColor: 'rgba(255, 255, 255, 0.8)',
    borderTopWidth: 1,
  },
  emptySpace: {
    flex: 1,
  },
  headerGroup: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    flex: 0.18,
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
  picker: {
    backgroundColor: 'white',
    flex: 0.82,
  },
});

export default styles;
