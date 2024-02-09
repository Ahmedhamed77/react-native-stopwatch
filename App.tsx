import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Animated, {
  EntryAnimationsValues,
  ExitAnimationsValues,
  LayoutAnimation,
  StyleProps,
  withTiming,
} from "react-native-reanimated";

const animationDistance = 150;
const animationDuration = 300;

export default function App() {
  const [counter, setCounter] = useState(0);

  const onIncrement = () => setCounter((prev) => prev + 1);

  const entering = (values: EntryAnimationsValues): LayoutAnimation => {
    "worklet";
    const animations: StyleProps = {
      originY: withTiming(values.targetOriginY, {
        duration: animationDuration,
      }),
    };
    const initialValues: StyleProps = {
      originY: values.targetOriginY - animationDistance,
    };
    return {
      initialValues,
      animations,
    };
  };

  const existing = (values: ExitAnimationsValues): LayoutAnimation => {
    "worklet";
    const animations: StyleProps = {
      originY: withTiming(values.currentOriginY + animationDistance, {
        duration: animationDuration,
      }),
    };
    const initialValues: StyleProps = {
      originY: values.currentOriginY,
    };

    return {
      animations,
      initialValues,
    };
  };
  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: 32, overflow: "hidden" }}>
        <Animated.Text
          key={counter}
          entering={entering}
          exiting={existing}
          style={styles.counter}
        >
          {counter}
        </Animated.Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable onPressIn={onIncrement} style={styles.buttonStyle}>
          <Text style={styles.buttonTitle}>Increment</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  counter: {
    fontSize: 48,
    fontWeight: "bold",
    fontVariant: ["tabular-nums"],
    width: 100,
    textAlign: "center",
  },

  buttonContainer: {
    position: "absolute",
    backgroundColor: "#ffffff",
    bottom: 100,
    left: 64,
    right: 64,
  },
  buttonStyle: {
    backgroundColor: "#1B59F8",
    paddingVertical: 12,
    borderRadius: 22,
    paddingHorizontal: 22,
    width: "100%",
    alignItems: "center",
  },
  buttonTitle: {
    color: "#ffff",
  },
});
