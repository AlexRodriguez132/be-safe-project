import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, PanResponder, Animated, Dimensions } from 'react-native';
import { IconRobot } from 'tabler-icons-react-native';
import colors from '../theme/colors';

interface ChatbotFABProps {
  onPress?: () => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const FAB_SIZE = 56;
const MARGIN = 16;

export default function ChatbotFAB({ onPress }: ChatbotFABProps) {
  const [position, setPosition] = useState({ x: SCREEN_WIDTH - FAB_SIZE - MARGIN, y: SCREEN_HEIGHT - FAB_SIZE - 100 });
  const pan = React.useRef(new Animated.ValueXY()).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Si está en el lado derecho, solo permite movimiento vertical
        if (position.x > SCREEN_WIDTH / 2) {
          pan.setValue({ x: 0, y: gestureState.dy });
        } 
        // Si está en el lado izquierdo, solo permite movimiento vertical
        else {
          pan.setValue({ x: 0, y: gestureState.dy });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        let newY = Math.max(MARGIN, Math.min(position.y + gestureState.dy, SCREEN_HEIGHT - FAB_SIZE - 100));
        
        // Snap a lado derecho o izquierdo
        let newX = position.x > SCREEN_WIDTH / 2 ? SCREEN_WIDTH - FAB_SIZE - MARGIN : MARGIN;
        
        setPosition({ x: newX, y: newY });
        pan.setValue({ x: 0, y: 0 });
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.fab,
        {
          left: position.x,
          top: position.y,
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.button}>
        <IconRobot size={28} color="white" strokeWidth={1.5} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: FAB_SIZE,
    height: FAB_SIZE,
  },
  button: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    backgroundColor: colors.tealDark,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});