/**
 * QR Code Display Component
 * Renders QR codes and barcodes with Skia effects
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import QRCodeSVG from 'react-native-qrcode-svg';
import {Canvas, RoundedRect, Shadow, LinearGradient, vec} from '@shopify/react-native-skia';
import {QRCode} from '@/types';
import {spacing, borderRadius, shadows} from '@/theme';

interface QRCodeDisplayProps {
  code: QRCode;
  size?: number;
  showBackground?: boolean;
  enableEffects?: boolean;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  code,
  size = 256,
  showBackground = true,
  enableEffects = true,
}) => {
  const renderQRCode = () => {
    if (code.type === 'QR') {
      return (
        <QRCodeSVG
          value={code.data}
          size={size}
          color={code.color}
          backgroundColor={code.backgroundColor}
          logo={code.logo ? {uri: code.logo} : undefined}
          logoSize={size * 0.2}
          logoBackgroundColor={code.backgroundColor}
          logoBorderRadius={8}
          ecl={code.errorCorrectionLevel || 'M'}
        />
      );
    }

    // For barcodes, we would use react-native-barcode-builder here
    return null;
  };

  if (!enableEffects) {
    return (
      <View style={[styles.container, {width: size, height: size}]}>
        {renderQRCode()}
      </View>
    );
  }

  // Render with Skia effects
  return (
    <View style={[styles.container, {width: size + 32, height: size + 32}]}>
      <Canvas style={{width: size + 32, height: size + 32}}>
        {showBackground && (
          <>
            <Shadow dx={0} dy={4} blur={12} color="rgba(0,0,0,0.12)" />
            <RoundedRect
              x={0}
              y={0}
              width={size + 32}
              height={size + 32}
              r={borderRadius.xl}
              color={code.backgroundColor}>
              <LinearGradient
                start={vec(0, 0)}
                end={vec(size + 32, size + 32)}
                colors={[code.backgroundColor, code.backgroundColor]}
              />
            </RoundedRect>
          </>
        )}
      </Canvas>
      <View style={styles.qrContainer}>{renderQRCode()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
