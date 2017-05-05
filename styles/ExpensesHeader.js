import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
  },

  //
  // First Section
  //
  firstSection: {
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  startDateGroup: {
    flex: 0.3,
    flexDirection: 'column'
  },
  dateLabelGroup: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  dateImage: {
    marginTop: 2,
    marginLeft: 10,
  },
  dateLabel: {
    fontFamily: 'HelveticaNeue',
    fontWeight: '200',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'left',
    paddingLeft: 5,
  },
  date: {
    fontFamily: 'HelveticaNeue',
    fontWeight: '300',
    fontSize: 20,
    color: 'white',
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 28
  },
  totalGroup: {
    flex: 0.4,
    flexDirection: 'column'
  },
  totalLabel: {
    fontFamily: 'HelveticaNeue',
    fontWeight: '200',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center'
  },
  total: {
    fontFamily: 'HelveticaNeue',
    fontWeight: '300',
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    marginTop: 5
  },
  endDateGroup: {
    flex: 0.3,
    flexDirection: 'column'
  },

  //
  // Second Section
  //
  secondSection: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
    borderTopWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10
  },
  searchGroup: {
    flex: 0.7,
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginLeft: 10,
  },
  searchIcon: {
    borderLeftColor: 'white',
    borderLeftWidth: 2,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10
  },
  searchInput: {
    flex: 1,
    fontFamily: 'HelveticaNeue',
    fontWeight: '200',
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
    paddingLeft: 5,
    paddingRight: 10,
    marginRight: 10,
    backgroundColor: 'transparent'
  },
  filtersButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    marginRight: 10,
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  filtersButtonGroup: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  filtersText: {
    fontFamily: 'HelveticaNeue',
    fontWeight: '200',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    marginLeft: 5
  },
});

export default styles;
