import React, { useEffect } from 'react';
import { Platform, Animated, StyleSheet } from 'react-native';

import theme from './theme';

// see: https://medium.com/appandflow/react-native-collapsible-navbar-e51a049b560a

const absolutePosition = Platform.select({ web: 'fixed', default: 'absolute' });

const NAVBAR_HEIGHT = 64;
const STATUS_BAR_HEIGHT = 0;

const useHeaderAnimation = () => {
  const scrollAnim = new Animated.Value(0);
  const offsetAnim = new Animated.Value(0);
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      offsetAnim,
    ),
    0,
    NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
  );

  const _clampedScrollValue = 0;
  const _offsetValue = 0;
  const _scrollValue = 0;

  useEffect(() => {
    scrollAnim.addListener(({ value }) => {
      const diff = value - _scrollValue;
      _scrollValue = value;
      _clampedScrollValue = Math.min(
        Math.max(_clampedScrollValue + diff, 0),
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
      );
    });
    offsetAnim.addListener(({ value }) => {
      _offsetValue = value;
    });

    return () => {
      scrollAnim.removeAllListeners();
      offsetAnim.removeAllListeners();
    };
  }, []);

  const onScrollEndDrag = () => {
    _scrollEndTimer = setTimeout(onMomentumScrollEnd, 250);
  };

  const onMomentumScrollBegin = () => {
    clearTimeout(_scrollEndTimer);
  };

  const onMomentumScrollEnd = () => {
    const toValue =
      _scrollValue > NAVBAR_HEIGHT &&
      _clampedScrollValue > (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) / 2
        ? _offsetValue + NAVBAR_HEIGHT
        : _offsetValue - NAVBAR_HEIGHT;

    Animated.timing(offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollAnim } } }],
    { useNativeDriver: true },
  );

  const headerTranslate = clampedScroll.interpolate({
    inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
    outputRange: [0, -(NAVBAR_HEIGHT - STATUS_BAR_HEIGHT)],
    extrapolate: 'clamp',
  });
  const headerOpacity = clampedScroll.interpolate({
    inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return {
    onScrollEndDrag,
    onMomentumScrollBegin,
    onMomentumScrollEnd,
    onScroll,
    AnimatedListHeader: () => (
      <Animated.View
        style={[
          styles.navbar,
          { transform: [{ translateY: headerTranslate }] },
        ]}
      >
        <Animated.Text
          accessibilityRole="header"
          aria-level="2"
          style={[styles.title, { opacity: headerOpacity }]}
        >
          Grocli
        </Animated.Text>
      </Animated.View>
    ),
  };
};

export default useHeaderAnimation;

const styles = StyleSheet.create({
  navbar: {
    position: absolutePosition,
    top: 0,
    left: 0,
    right: 0,
    height: theme.space[5],
    backgroundColor: theme.colors.gray[800],
    padding: theme.space[3],
  },
  title: {
    color: theme.colors.text,
    fontFamily: 'nunito-bold',
    fontSize: theme.fontSizes[4],
    fontWeight: '700',
  },
});
