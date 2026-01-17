import { useState } from 'react';
import { View, SectionList } from 'react-native';
import { Text } from '~/components/ui';
import { useTrackerStore } from '~/store/tracker';
import { selectRegionSections, selectTotalScore } from '~/store/selectors';
import { RegionId, Power } from '~/store/types';
import { PointSheetModal } from '~/components/ts/PointSheetModal';
import { usePointStore } from '~/store';
import { RegionHeader } from '~/components/ts/RegionHeader';
import { CountryItem } from '~/components/ts/CountryItem';

export default function Index() {
  const sections = useTrackerStore(selectRegionSections);
  const usaScore = useTrackerStore(selectTotalScore(Power.USA));

  const clearInfluences = useTrackerStore((s) => s.resetInfluences);
  const { pointsModal, setPointsModal } = usePointStore();

  const [expandedSections, setExpandedSections] = useState<Set<RegionId>>(new Set());

  const toggleSection = (regionId: RegionId) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      next.has(regionId) ? next.delete(regionId) : next.add(regionId);
      return next;
    });
  };

  return (
    <View className="flex-1 px-4">
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.name}
        stickySectionHeadersEnabled
        extraData={expandedSections}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="mb-4 rounded-2xl p-4">
            <Text variant="heading" color="primary">
              Punti Potenziali USA: {usaScore}
            </Text>
          </View>
        }
        renderItem={({ section, item }) =>
          expandedSections.has(section.regionId) ? <CountryItem country={item} /> : null
        }
        renderSectionHeader={({ section }) => (
          <RegionHeader
            title={section.title}
            isExpanded={expandedSections.has(section.regionId)}
            onPress={() => toggleSection(section.regionId)}
          />
        )}
      />

      <View className="mb-8 flex-row items-center px-4">
        <Text onPress={clearInfluences}>Reset influenze</Text>
      </View>

      <PointSheetModal visible={pointsModal} onClose={() => setPointsModal(false)} />
    </View>
  );
}
