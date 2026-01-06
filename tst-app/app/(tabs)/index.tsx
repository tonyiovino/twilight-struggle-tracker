import { View } from 'react-native';
import { Text } from '~/components/ui';
import { FlipCounter } from '~/components/partials';
import { StyleSheet, SectionList, StatusBar, Pressable } from 'react-native';
import { useState } from 'react';

import Regions from '~/components/ts/Regions';

export default function TabOneScreen() {
  const DATA = [
    {
      title: 'Europa',
      data: ['Italia', 'Spagna', 'Germania'],
    },
    {
      title: 'Africa',
      data: ['Marocco', 'Senegal', 'Zimbawe'],
    },
  ];
  const [expandedSections, setExpandedSections] = useState(new Set());

  const handleToggle = (title: string) => {
    setExpandedSections((expandedSections) => {
      // Using Set here but you can use an array too
      const next = new Set(expandedSections);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  const Item = ({ title }: { title: string }) => (
    <View className="flex-row justify-center gap-8 p-2">
      <FlipCounter count={5}></FlipCounter>

      <View className="w-1/3 items-center bg-red-500">
        <Text>{title}</Text>
      </View>

      <FlipCounter count={5}></FlipCounter>
    </View>
  );

  return (
    <View className="flex-1 px-4">
      <SectionList
        sections={DATA}
        extraData={expandedSections} // extraData is required to re-render the list when expandedSections changes
        keyExtractor={(item, index) => item + index}
        renderItem={({ section: { title }, item }) => {
          // check to see if the section is expanded
          const isExpanded = expandedSections.has(title);

          //return null if it is
          if (!isExpanded) return null;

          return <Item title={item} />;
        }}
        renderSectionHeader={({ section: { title } }) => (
          <View className="items-center p-4">
            <Pressable onPress={() => handleToggle(title)}>
              <Text>{title}</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
