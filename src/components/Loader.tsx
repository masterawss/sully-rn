import { View } from "native-base";
import { StyleSheet } from "react-native";
import LottieView from 'lottie-react-native';

const Loader = () => {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        style={{
          width: '100%',
          height: 200,
          backgroundColor: '#f2f2f2',
          borderRadius: 500
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../../assets/lottie/loader2.json')}
      />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});