import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, textStyles} from '../../../styles/styles';
const WINDOW_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  // tab navigation
  tabNavigation: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  tab: {
    flex: 1,
  },
  tabNavigationObject: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.SECONDARY_TRANSPARENT,
  },
  tabNavigationObjectSelected: {
    borderBottomWidth: 3,
    borderColor: COLORS.PRIMARY,
    alignItems: 'center',
  },
  tabNavigationText: {
    ...textStyles.paragraphLarge,
    color: COLORS.SECONDARY_TRANSPARENT,
    borderBottomWidth: 1,
    borderColor: COLORS.TRANSPARENT,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  tabNavigationTextSelected: {
    ...textStyles.paragraphLargeBold,
    color: COLORS.PRIMARY,
    borderBottomWidth: 1,
    borderColor: COLORS.TRANSPARENT,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },

  //   carousel
  carousel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: Math.floor(WINDOW_HEIGHT / 9),
    marginTop: 20,
    marginBottom: 30,
  },
  carouselImageContainer: {
    marginHorizontal: 10,
    borderColor: '#66666666',
    borderRadius: 6,
    width: 70,
    height: 70,
    flex: 1,
  },
  carouselTouchable: {
    height: '100%',
  },
  carouselImage: {
    width: undefined,
    height: undefined,
    flex: 1,
    borderRadius: 6,
  },
  //   safety element
  safetyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  safetyElement: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginTop: 10,
  },
  safetyElementText: {
    marginLeft: 5,
    color: COLORS.SECONDARY,
    ...textStyles.paragraphSmallBold,
  },

  //   text
  subheading: {
    ...textStyles.paragraphMedium,
    color: COLORS.SECONDARY,
  },
  value: {
    paddingRight: 20,
  },
  description: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.SECONDARY_TRANSPARENT,
    paddingBottom: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default styles;
