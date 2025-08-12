import handleError from "@/src/helpers/handleError";
import { locationContext } from "@/src/providers/LocationProvider";
import { gql, useQuery } from "@apollo/client";
import { useContext } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

export default function HomeScreen() {
  const { coords, locationPermissionRejected, requestLocation } =
    useContext(locationContext);

  const { data, error } = useQuery(
    gql`
      query HomeScreen($origin: PointInput!) {
        loos(origin: $origin, distanceMeters: 1000) {
          id
          name
          distanceMeters(origin: $origin)
          dataProvider {
            id
            name
            logo
          }
        }
      }
    `,
    { variables: {}, skip: !coords }
  );
  handleError(error);

  return (
    <SafeAreaView>
      <View style={{ gap: 10, padding: 10 }}>
        {locationPermissionRejected && (
          <Card>
            <Card.Title title="Location Permission Not Granted" />
            <Card.Content>
              <Text>
                Location permission is required to use this app. Please enable
                it in your device settings.
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={requestLocation}>Request Permission</Button>
            </Card.Actions>
          </Card>
        )}
        {data?.loos.map((loo) => (
          <Card key={loo.id}>
            <Card.Title title={loo.name} />
            <Card.Content>
              <Text>
                {loo.distanceMeters} meters away from you, provided by{" "}
                {loo.dataProvider.name}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </SafeAreaView>
  );
}
