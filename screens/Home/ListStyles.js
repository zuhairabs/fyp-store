import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  tabNavigation: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  tabNavigationObject: {
    alignItems: 'center',
  },
  tabNavigationObjectSelected: {
    borderBottomWidth: 3,
    borderColor: '#0062FF',
    alignItems: 'center',
  },
  tabNavigationText: {
    fontSize: 16,
    color: '#6666666F',
    paddingBottom: 10,
    textTransform: 'capitalize',
    paddingHorizontal: 20,
  },
  tabNavigationTextSelected: {
    fontSize: 16,
    color: '#0062FF',
    paddingBottom: 10,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  listContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginBottom: 50,
    minHeight: 200,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
  },
  subheading: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  paragraph: {
    fontSize: 12,
    color: '#666',
    paddingHorizontal: 2,
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flex: 1,
    margin: 50,
  },
});

export default styles;
