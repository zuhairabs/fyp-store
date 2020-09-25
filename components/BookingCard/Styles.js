import {StyleSheet, Dimensions} from 'react-native';
import {textStyles} from '../../styles/styles';
const WINDOW_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    width: WINDOW_WIDTH - 40,
    marginTop: 20,
  },
  container: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 3,
    zIndex: 0,
  },
  touchableCard: {
    flex: 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  dateContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#7070702F',
    padding: 8,
  },
  date: {
    ...textStyles.paragraphMedium,
    color: '#666',
  },
  imageContainer: {
    flex: 2,
    marginLeft: 20,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  details: {
    flex: 5,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  header: {
    ...textStyles.paragraphMediumBold,
    color: '#000',
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
  },
  timeText: {
    color: '#666',
    marginLeft: 8,
    ...textStyles.paragraphSmall,
  },
  bookingStatusIcon: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
