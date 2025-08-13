import { gql } from "@/src/__generated__";
import handleError from "@/src/helpers/handleError";
import { locationContext } from "@/src/providers/LocationProvider";
import { useQuery } from "@apollo/client";
import { useThrottle } from "@uidotdev/usehooks";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const MAP_SCREEN_QUERY = gql(/* GraphQL */ `
  query MapScreenQuery($origin: PointInput!, $distanceMeters: Int!) {
    loos(origin: $origin, distanceMeters: $distanceMeters) {
      id
      name
      lonlat {
        lon
        lat
      }
    }
  }
`);

export default function MapScreen() {
  const { coords } = useContext(locationContext);
  const [region, regionSet] = useState<Region>(
    coords
      ? {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.0922, // Default delta for zoom level
          longitudeDelta: 0.0421, // Default delta for zoom level
        }
      : {
          // NZ coordinates
          latitude: -40.9006,
          longitude: 174.886,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }
  );
  const { latitude, longitude, longitudeDelta, latitudeDelta } = region;
  const latitudeThrottled = useThrottle(latitude, 1000);
  const longitudeThrottled = useThrottle(longitude, 1000);
  const distanceMeters = Math.ceil(
    Math.max(
      latitudeDelta * 111320, // Convert degrees to meters
      longitudeDelta * 111320 * Math.cos((latitude * Math.PI) / 180) // Adjust for longitude delta
    )
  );
  const distanceMetersThrottled = useThrottle(distanceMeters, 1000);
  const { data, error } = useQuery(MAP_SCREEN_QUERY, {
    variables: {
      origin: {
        lat: latitudeThrottled,
        lon: longitudeThrottled,
      },
      distanceMeters: distanceMetersThrottled,
    },
  });
  handleError(error);
  const [loos, setLoos] = useState(data?.loos || []);
  useEffect(() => {
    if (data?.loos) {
      setLoos(data.loos);
    }
  }, [data]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={region}
        onRegionChangeComplete={regionSet}
      >
        {coords && (
          <Marker
            coordinate={{
              latitude: coords.latitude,
              longitude: coords.longitude,
            }}
            title="Your Location"
          />
        )}
        {loos.map((loo) => (
          <Marker
            key={loo.id}
            coordinate={{
              latitude: loo.lonlat.lat,
              longitude: loo.lonlat.lon,
            }}
            title={loo.name}
          />
        ))}
      </MapView>
    </View>
  );
}
