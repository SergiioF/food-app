import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

if (__DEV__) {
  const tron = Reactotron.configure({ host: '192.168.42.227' }) // this is because using expo
    .useReactNative({
      networking: {
        // Cuando se usa expo es necesario ignorar todo el trafico 
        //que realiza expo internamente, para no llenar la consola
        ignoreUrls: /symbolicate|127.0.0.1/, 
      },
    })
    .use(reactotronRedux())
    .connect();

  console.tron = tron;

  tron.clear();
}
