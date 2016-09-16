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
    flexDirection: 'row',
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
  deleteText: {
    flex: 0.3,
    fontFamily: 'HelveticaNeue',
    fontWeight: '300',
    fontSize: 16,
    color: '#CC0000',
    textAlign: 'right',
    padding: 10,
  },
  expenseContainer: {
    backgroundColor: 'white',
    paddingBottom: 20,
    paddingTop: 10
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
    fontFamily: 'HelveticaNeue',
    fontWeight: '300',
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  }
});

export default styles;
