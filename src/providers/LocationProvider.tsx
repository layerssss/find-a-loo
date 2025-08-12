import {
  LocationObjectCoords,
  LocationSubscription,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from "expo-location";
import { createContext, useEffect, useState } from "react";

export const locationContext = createContext<{
  coords: LocationObjectCoords | null;
  locationPermissionRejected: boolean;
  requestLocation: () => Promise<void>;
}>({
  coords: null,
  locationPermissionRejected: false,
  requestLocation: async () => {},
});

export default function LocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [coords, setCoords] = useState<LocationObjectCoords | null>(null);
  const [locationPermissionRejected, locationPermissionRejectedSet] =
    useState(false);
  const [locationSubscription, locationSubscriptionSet] =
    useState<LocationSubscription | null>(null);

  const requestLocation = async () => {
    if (locationSubscription) return;
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== "granted") {
      locationPermissionRejectedSet(true);
      return console.error("Location permission not granted");
    }
    locationPermissionRejectedSet(false);
    const locationSubscriptionNew = await watchPositionAsync({}, (location) => {
      setCoords(location.coords);
    });
    locationSubscriptionSet(locationSubscriptionNew);
  };

  useEffect(() => {
    requestLocation();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  return (
    <locationContext.Provider
      value={{ coords, requestLocation, locationPermissionRejected }}
    >
      {children}
    </locationContext.Provider>
  );
}
