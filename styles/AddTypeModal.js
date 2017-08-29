import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');
const smaller = (window.width <= 320);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  pane: {
    flex: 0.25,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopColor: 'rgba(255, 255, 255, 0.8)',
    borderTopWidth: 1,
  },
  emptySpace: {
    flex: smaller ? 0.5 : 0.75,
  },
  emptyShortSpace: {
    flex: smaller ? 0.1 : 0.15,
  },
  headerGroup: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  closeText: {
    flex: 0.3,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    fontSize: 16,
    color: '#1F86FF',
    textAlign: 'right',
    padding: 10,
  },
  titleText: {
    flex: 0.7,
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    padding: 10,
  },
  typeContainer: {
    backgroundColor: 'white',
    paddingBottom: 20,
    paddingTop: 10,
    flex: 0.7,
  },
  saveButtonContainer: {
    marginTop: 20,
    marginBottom: 10,
    marginRight: 10,
    alignItems: 'flex-end',
  },
  saveButton: {
    backgroundColor: '#50CCCB',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 60,
    paddingRight: 60,
  },
  saveButtonText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  }
});

export default styles;
