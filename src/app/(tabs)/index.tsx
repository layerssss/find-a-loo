import { gql } from "@/src/__generated__";
import handleError from "@/src/helpers/handleError";
import { locationContext } from "@/src/providers/LocationProvider";
import { useQuery } from "@apollo/client";
import Slider from "@react-native-community/slider";
import { useScrollToTop } from "@react-navigation/native";
import { useThrottle } from "@uidotdev/usehooks";
import { Image } from "expo-image";
import { useContext, useEffect, useRef, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Button, Card, Surface, Text } from "react-native-paper";

const HOME_SCREEN_QUERY = gql(/* GraphQL */ `
  query HomeScreen($origin: PointInput!, $distanceMeters: Int!) {
    loos(origin: $origin, distanceMeters: $distanceMeters) {
      id
      name
      lonlatDescription
      distanceMeters(origin: $origin)
      dataProvider {
        id
        name
        logo
      }
    }
  }
`);

export default function HomeScreen() {
  const { coords, locationPermissionRejected, requestLocation } =
    useContext(locationContext);
  const [distanceMeters, setDistanceMeters] = useState(1000);
  const distanceMetersThrottled = useThrottle(distanceMeters, 500);

  const { data, error } = useQuery(HOME_SCREEN_QUERY, {
    variables: {
      origin: {
        lon: coords?.longitude ?? 0,
        lat: coords?.latitude ?? 0,
      },
      distanceMeters: distanceMetersThrottled,
    },
    skip: !coords,
  });
  handleError(error);
  const flatListRef = useRef<FlatList>(null);
  useScrollToTop(flatListRef);
  const [loos, setLoos] = useState(data?.loos || []);
  useEffect(() => {
    if (data?.loos) {
      setLoos(data.loos);
    }
  }, [data]);

  const toolbar = (
    <Surface
      style={{
        padding: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Text>Distance:</Text>
        <Slider
          minimumValue={500}
          maximumValue={5000}
          step={500}
          value={distanceMeters}
          onValueChange={setDistanceMeters}
          style={{ flex: 1 }}
        />
        <Text style={{ width: 50, textAlign: "right" }}>{distanceMeters}m</Text>
      </View>
      {locationPermissionRejected && (
        <Card>
          <Card.Title title="Location Permission Not Granted" />
          <Card.Content>
            <Text>
              Location permission is required to use this app. Please enable it
              in your device settings.
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={requestLocation}>Request Permission</Button>
          </Card.Actions>
        </Card>
      )}
    </Surface>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={loos}
        ref={flatListRef}
        style={{ gap: 10, padding: 10 }}
        renderItem={({ item: loo }) => (
          <View style={{ gap: 10 }}>
            {loos.map((loo) => (
              <Card key={loo.id}>
                <Card.Title title={loo.name} />
                <Card.Content>
                  <Text>{loo.lonlatDescription}</Text>
                  <Text>{loo.distanceMeters} meters away</Text>
                  {loo.dataProvider && (
                    <View
                      style={{
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      {loo.dataProvider.logo ? (
                        <Image
                          alt={loo.dataProvider.name}
                          source={{ uri: loo.dataProvider.logo }}
                          style={{ width: 32, height: 32 }}
                          contentFit="contain"
                        />
                      ) : (
                        <Text>{loo.dataProvider?.name}</Text>
                      )}
                    </View>
                  )}
                </Card.Content>
              </Card>
            ))}
          </View>
        )}
      />
      {toolbar}
    </SafeAreaView>
  );
}
