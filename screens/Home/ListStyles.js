import {StyleSheet} from 'react-native';
import {COLORS, textStyles} from '../../styles/styles';

const styles = StyleSheet.create({
  tabNavigation: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: COLORS.BACKGROUND,
  },
  tabNavigationObject: {
    alignItems: 'center',
  },
  tabNavigationObjectSelected: {
    borderBottomWidth: 3,
    borderColor: COLORS.PRIMARY,
    alignItems: 'center',
  },
  tabNavigationText: {
    ...textStyles.paragraphLarge,
    color: COLORS.SECONDARY_TRANSPARENT,
    paddingBottom: 10,
    textTransform: 'capitalize',
    paddingHorizontal: 20,
  },
  tabNavigationTextSelected: {
    ...textStyles.paragraphLargeBold,
    fontSize: 16,
    color: COLORS.PRIMARY,
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
    ...textStyles.paragraphSmall,
  },
  paragraph: {
    ...textStyles.paragraphSmall,
    color: COLORS.SECONDARY,
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
