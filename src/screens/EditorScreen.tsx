/**
 * Editor Screen - QR/Barcode creation and editing
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, CodeType} from '@/types';
import {useCodeStore} from '@/store';
import {qrService} from '@/services';
import {AnimatedButton, Input, QRCodeDisplay} from '@/components';
import {colors, spacing, typography} from '@/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Editor'>;

export const EditorScreen: React.FC<Props> = ({navigation, route}) => {
  const {codeId, type: initialType} = route.params || {};
  const {codes, addCode, updateCode} = useCodeStore();

  const existingCode = codeId ? codes.find(c => c.id === codeId) : null;

  const [codeType, setCodeType] = useState<CodeType>(
    existingCode?.type || initialType || 'QR',
  );
  const [data, setData] = useState(existingCode?.data || '');
  const [title, setTitle] = useState(existingCode?.title || '');
  const [color, setColor] = useState(existingCode?.color || '#000000');
  const [backgroundColor, setBackgroundColor] = useState(
    existingCode?.backgroundColor || '#FFFFFF',
  );
  const [size, setSize] = useState(existingCode?.size || 256);
  const [error, setError] = useState('');

  useEffect(() => {
    navigation.setOptions({
      title: codeId ? 'Edit Code' : 'New Code',
    });
  }, [codeId, navigation]);

  const validateData = (): boolean => {
    const validation = qrService.validateCodeData(data, codeType);
    if (!validation.success) {
      setError(validation.error?.message || 'Invalid data');
      return false;
    }
    if (!validation.data) {
      setError(`Invalid format for ${qrService.getCodeTypeName(codeType)}`);
      return false;
    }
    setError('');
    return true;
  };

  const handleSave = () => {
    if (!validateData()) return;

    const codeData = {
      type: codeType,
      data,
      title,
      color,
      backgroundColor,
      size,
    };

    if (codeId) {
      updateCode(codeId, codeData);
    } else {
      addCode(codeData);
    }

    navigation.goBack();
  };

  const previewCode = data
    ? {
        id: 'preview',
        type: codeType,
        data,
        title,
        color,
        backgroundColor,
        size,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        isFavorite: false,
        usageCount: 0,
      }
    : null;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          {/* Preview */}
          {previewCode && (
            <View style={styles.preview}>
              <QRCodeDisplay code={previewCode} size={200} enableEffects />
            </View>
          )}

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Data *"
              value={data}
              onChangeText={setData}
              placeholder={`Enter ${qrService.getCodeTypeName(codeType)} data`}
              error={error}
              maxLength={qrService.getMaxDataLength(codeType)}
              autoCapitalize="none"
              autoCorrect={false}
              accessible
              accessibilityLabel="Code data input"
              accessibilityHint={`Enter the data for your ${qrService.getCodeTypeName(codeType)}`}
            />

            <Input
              label="Title (Optional)"
              value={title}
              onChangeText={setTitle}
              placeholder="My QR Code"
              accessible
              accessibilityLabel="Code title input"
            />

            <View style={styles.colorRow}>
              <View style={styles.colorField}>
                <Input
                  label="Color"
                  value={color}
                  onChangeText={setColor}
                  placeholder="#000000"
                  accessible
                  accessibilityLabel="Foreground color"
                />
              </View>
              <View style={styles.colorField}>
                <Input
                  label="Background"
                  value={backgroundColor}
                  onChangeText={setBackgroundColor}
                  placeholder="#FFFFFF"
                  accessible
                  accessibilityLabel="Background color"
                />
              </View>
            </View>

            <Text style={styles.helperText}>
              {`${data.length} / ${qrService.getMaxDataLength(codeType)} characters`}
            </Text>
          </View>
        </ScrollView>

        {/* Actions */}
        <View style={styles.actions}>
          <AnimatedButton
            title={codeId ? 'Update' : 'Create'}
            onPress={handleSave}
            variant="primary"
            fullWidth
            disabled={!data}
            accessibilityLabel={codeId ? 'Update code' : 'Create code'}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background.default,
  },
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing[20],
  },
  preview: {
    alignItems: 'center',
    paddingVertical: spacing[8],
    backgroundColor: colors.light.background.paper,
  },
  form: {
    padding: spacing[4],
  },
  colorRow: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  colorField: {
    flex: 1,
  },
  helperText: {
    ...typography.caption,
    color: colors.light.text.hint,
    textAlign: 'right',
    marginTop: spacing[2],
  },
  actions: {
    padding: spacing[4],
    backgroundColor: colors.light.background.default,
    borderTopWidth: 1,
    borderTopColor: colors.light.border,
  },
});
