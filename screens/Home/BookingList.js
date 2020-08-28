import React from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import {
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native-gesture-handler';
import styles from './ListStyles';
import BookingCard from '../../components/BookingCard/BookingCard';

const ListHeader = ({tabData, selectedTab, changeTab}) => (
  <View style={styles.tabNavigation}>
    {tabData.map((tab, index) => {
      return (
        <View key={index}>
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
);

const DetailsItem = ({title, val}) => (
  <View style={styles.detailItem}>
    <Text style={styles.subheading}>{title}: </Text>
    <Text style={styles.paragraph}>{val}</Text>
  </View>
);

const DetailsContainer = ({bookings}) =>
  bookings.length > 0 && (
    <View style={styles.detailsContainer}>
      <DetailsItem title="Total bookings" val={bookings.length} />
      <DetailsItem title="Completed" val={0} />
      <DetailsItem title="Pending" val={bookings.length} />
    </View>
  );

export default ({tabData, changeTab, bookings, selectedTab, loading}) => (
  <>
    <ListHeader
      tabData={tabData}
      selectedTab={selectedTab}
      changeTab={changeTab}
    />

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
          <DetailsContainer bookings={bookings} />
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
