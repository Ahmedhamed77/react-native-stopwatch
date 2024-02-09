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
import { useClock } from "./useClock";

const animationDistance = 150;
const animationDuration = 300;

export default function App() {


  const {counter:timer,start,pause,isRunning} = useClock(0);


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

  console.log(isRunning,'===isRunning')
  return (
    <View style={styles.container}>
      <View style={{  overflow: "hidden",backgroundColor:'#ffffff',borderRadius:12,width:'100%',alignItems:'center' }}>
        <Animated.Text
          key={timer}
          entering={entering}
          exiting={existing}
          style={styles.counter}
        >
          {timer}
        </Animated.Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable onPressIn={!isRunning ? start: pause} style={styles.buttonStyle}>
          <Text style={styles.buttonTitle}>{!isRunning ? 'Start' : 'Pause'}</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEAF3",
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
