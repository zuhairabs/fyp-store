import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Image} from 'react-native';
import {
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native-gesture-handler';
import BookingCard from '../../components/BookingCard/BookingCard';

export default ({tabData, changeTab, bookings, selectedTab, loading}) => {
  const getPendingBookings = () => {
    let res = 0;
    bookings.forEach((element) => {
      if (element.status === 'upcoming') ++res;
    });
    return res;
  };

  return (
    <>
      <View style={styles.tabNavigation}>
        {tabData.map((tab, index) => {
          return (
            <View key={index} style={{flex: 1}}>
              <TouchableWithoutFeedback
                style={
                  index === selectedTab
                    ? styles.tabNavigationObjectSelected
                    : styles.tabNavigationObject
                }
                onPress={() => {
                  changeTab(index);
                }}>
                <Text
                  style={
                    index === selectedTab
                      ? styles.tabNavigationTextSelected
                      : styles.tabNavigationText
                  }>
                  {tab.title}
                </Text>
              </TouchableWithoutFeedback>
            </View>
          );
        })}
      </View>

      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        {loading ? (
          <View style={styles.listContainer}>
            <ActivityIndicator size="large" color="#0062FF" />
          </View>
        ) : (
          <>
            <View style={styles.detailsContainer}>
              {bookings.length > 0 && (
                <>
                  <View style={styles.detailItem}>
                    <Text style={styles.subheading}>Total bookings: </Text>
                    <Text style={styles.paragraph}>{bookings.length}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.subheading}>Completed: </Text>
                    <Text style={styles.paragraph}>0</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.subheading}>Pending: </Text>
                    <Text style={styles.paragraph}>{bookings.length}</Text>
                  </View>
                </>
              )}
            </View>
            <View style={styles.listContainer}>
              {bookings.length === 0 ? (
                <View style={styles.cardContainer}>
                  <Image
                    source={require('./res/EmptyPage.png')}
                    style={{
                      width: 200,
                      height: 200,
                      marginBottom: 20,
                      flex: 1,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text>No bookings</Text>
                </View>
              ) : (
                bookings.map((booking) => {
                  return <BookingCard key={booking._id} booking={booking} />;
                })
              )}
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  tabNavigation: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  tabNavigationObject: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#777',
  },
  tabNavigationObjectSelected: {
    flex: 1,
    borderBottomWidth: 3,
    borderColor: '#0062FF',
    alignItems: 'center',
  },
  tabNavigationText: {
    fontSize: 16,
    color: '#6666666F',
    paddingBottom: 10,
    paddingHorizontal: 15,
    textTransform: 'capitalize',
  },
  tabNavigationTextSelected: {
    fontSize: 16,
    color: '#0062FF',
    paddingBottom: 10,
    textTransform: 'capitalize',
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
