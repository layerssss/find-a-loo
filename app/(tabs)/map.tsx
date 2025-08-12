import { locationContext } from "@/providers/LocationProvider";
import { useContext, useState } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

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

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={region}
        onRegionChange={(region) => regionSet(region)}
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
      </MapView>
    </View>
  );
}
