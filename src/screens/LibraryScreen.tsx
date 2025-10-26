/**
 * Library Screen - Browse and manage codes
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, QRCode} from '@/types';
import {useCodeStore} from '@/store';
import {AnimatedCard, QRCodeDisplay, Input} from '@/components';
import {colors, spacing, typography} from '@/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Library'>;

export const LibraryScreen: React.FC<Props> = ({navigation}) => {
  const {getFilteredCodes, searchQuery, setSearchQuery, toggleFavorite, deleteCode} =
    useCodeStore();
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);

  const codes = getFilteredCodes();

  const handleCodePress = (code: QRCode) => {
    if (selectedCodes.length > 0) {
      toggleSelection(code.id);
    } else {
      navigation.navigate('Editor', {codeId: code.id});
    }
  };

  const handleCodeLongPress = (code: QRCode) => {
    toggleSelection(code.id);
  };

  const toggleSelection = (codeId: string) => {
    setSelectedCodes(prev =>
      prev.includes(codeId) ? prev.filter(id => id !== codeId) : [...prev, codeId],
    );
  };

  const renderCodeItem = ({item}: {item: QRCode}) => {
    const isSelected = selectedCodes.includes(item.id);

    return (
      <AnimatedCard
        style={[styles.codeItem, isSelected && styles.selectedItem]}
        onPress={() => handleCodePress(item)}>
        <View style={styles.codeContent}>
          <QRCodeDisplay code={item} size={80} showBackground={false} />
          <View style={styles.codeInfo}>
            <Text style={styles.codeTitle} numberOfLines={1}>
              {item.title || item.data}
            </Text>
            <Text style={styles.codeType}>{item.type}</Text>
            <Text style={styles.codeDate}>
              {new Date(item.updatedAt).toLocaleDateString()}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => toggleFavorite(item.id)}
            style={styles.favoriteButton}
            accessibilityLabel={item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            accessibilityRole="button">
            <Text style={styles.favoriteIcon}>
              {item.isFavorite ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        </View>
      </AnimatedCard>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Input
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search codes..."
          containerStyle={styles.searchContainer}
          accessible
          accessibilityLabel="Search codes"
          accessibilityHint="Enter text to search your codes"
        />
      </View>

      {selectedCodes.length > 0 && (
        <View style={styles.selectionBar}>
          <Text style={styles.selectionText}>
            {selectedCodes.length} selected
          </Text>
          <View style={styles.selectionActions}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Export', {codeIds: selectedCodes})
              }
              accessibilityLabel="Export selected codes"
              accessibilityRole="button">
              <Text style={styles.selectionAction}>Export</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedCodes([])}
              accessibilityLabel="Cancel selection"
              accessibilityRole="button">
              <Text style={styles.selectionAction}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        data={codes}
        renderItem={renderCodeItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No codes yet</Text>
            <Text style={styles.emptyHint}>
              Create your first QR code to get started
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background.default,
  },
  header: {
    padding: spacing[4],
    backgroundColor: colors.light.background.default,
  },
  searchContainer: {
    marginBottom: 0,
  },
  selectionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing[4],
    backgroundColor: colors.primary[50],
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
  selectionText: {
    ...typography.subtitle1,
    color: colors.primary[700],
  },
  selectionActions: {
    flexDirection: 'row',
    gap: spacing[4],
  },
  selectionAction: {
    ...typography.button,
    color: colors.primary[600],
  },
  list: {
    padding: spacing[4],
    gap: spacing[3],
  },
  codeItem: {
    marginBottom: spacing[3],
  },
  selectedItem: {
    backgroundColor: colors.primary[50],
  },
  codeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  codeInfo: {
    flex: 1,
  },
  codeTitle: {
    ...typography.subtitle1,
    color: colors.light.text.primary,
    marginBottom: spacing[1],
  },
  codeType: {
    ...typography.caption,
    color: colors.light.text.secondary,
    marginBottom: spacing[1],
  },
  codeDate: {
    ...typography.caption,
    color: colors.light.text.hint,
  },
  favoriteButton: {
    padding: spacing[2],
  },
  favoriteIcon: {
    fontSize: 24,
    color: colors.warning.main,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[12],
  },
  emptyText: {
    ...typography.h4,
    color: colors.light.text.secondary,
    marginBottom: spacing[2],
  },
  emptyHint: {
    ...typography.body2,
    color: colors.light.text.hint,
  },
});
