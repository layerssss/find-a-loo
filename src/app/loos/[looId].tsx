import { gql } from "@/src/__generated__";
import handleError from "@/src/helpers/handleError";
import { useQuery } from "@apollo/client";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";

const LOO_SCREEN_QUERY = gql(/* GraphQL */ `
  query LooScreenQuery($looId: ID!) {
    loo(id: $looId) {
      id
      name
    }
  }
`);

export default function LooScreen() {
  const { looId } = useLocalSearchParams<{ looId: string }>();
  const { data, error } = useQuery(LOO_SCREEN_QUERY, {
    variables: { looId },
  });
  handleError(error);
  const name = data?.loo?.name;

  return (
    <>
      <ScrollView style={{ flex: 1, padding: 10, gap: 10 }}>
        <Text variant="headlineSmall">{name}</Text>
      </ScrollView>
    </>
  );
}
