/**
 * Export Screen - Multi-format export
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, CodeFormat} from '@/types';
import {useCodeStore, useUIStore} from '@/store';
import {exportService} from '@/services';
import {AnimatedButton} from '@/components';
import {colors, spacing, typography} from '@/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Export'>;

export const ExportScreen: React.FC<Props> = ({navigation, route}) => {
  const {codeIds} = route.params;
  const {codes} = useCodeStore();
  const {setLoading, showToast} = useUIStore();
  const [selectedFormat, setSelectedFormat] = useState<CodeFormat>('png');

  const selectedCodes = codes.filter(c => codeIds.includes(c.id));

  const handleExport = async () => {
    setLoading(true, 'Exporting...');

    try {
      if (selectedCodes.length === 1) {
        const result = await exportService.exportCode(selectedCodes[0], {
          format: selectedFormat,
        });
        if (result.success && result.data) {
          await exportService.shareFile(result.data);
          showToast('Export successful', 'success');
          navigation.goBack();
        }
      } else {
        const result = await exportService.exportBatch(selectedCodes, {
          format: selectedFormat,
          codes: codeIds,
          layout: 'grid',
        });
        if (result.success && result.data) {
          await exportService.shareFile(result.data);
          showToast('Export successful', 'success');
          navigation.goBack();
        }
      }
    } catch (error) {
      showToast('Export failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const formats: CodeFormat[] = ['png', 'svg', 'pdf'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Export {selectedCodes.length} code(s)</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Format</Text>
          <View style={styles.formatGrid}>
            {formats.map(format => (
              <AnimatedButton
                key={format}
                title={format.toUpperCase()}
                onPress={() => setSelectedFormat(format)}
                variant={selectedFormat === format ? 'primary' : 'ghost'}
                size="large"
                accessibilityLabel={`Export as ${format}`}
                accessibilityState={{selected: selectedFormat === format}}
              />
            ))}
          </View>
        </View>

        <View style={styles.actions}>
          <AnimatedButton
            title="Export & Share"
            onPress={handleExport}
            variant="primary"
            fullWidth
            accessibilityLabel="Export and share codes"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background.default,
  },
  content: {
    flex: 1,
    padding: spacing[4],
  },
  title: {
    ...typography.h2,
    color: colors.light.text.primary,
    marginBottom: spacing[6],
  },
  section: {
    marginBottom: spacing[6],
  },
  label: {
    ...typography.subtitle1,
    color: colors.light.text.primary,
    marginBottom: spacing[3],
  },
  formatGrid: {
    gap: spacing[3],
  },
  actions: {
    marginTop: 'auto',
  },
});
