// import RNLocation from 'react-native-location';

// RNLocation.configure({
//   distanceFilter: 0.0,
//   androidProvider: 'auto',
//   interval: 5000, // Milliseconds
//   fastestInterval: 10000, // Milliseconds
//   maxWaitTime: 5000, // Milliseconds
// });

// RNLocation.checkPermission({
//   android: {
//     detail: 'coarse', // or 'fine'
//   },
// });

// const getLocation = () => {
//   return new Promise((reslove, reject) => {
//     try {
//       RNLocation.getCurrentPermission().then(currentPermission => {
//         if (
//           currentPermission == 'authorizedFine' ||
//           currentPermission == 'authorizedAlways' ||
//           currentPermission == 'authorizedCoarse' ||
//           currentPermission == 'authorizedWhenInUse'
//         ) {
//           RNLocation.subscribeToLocationUpdates(locations => {
//             if (locations) {
//               try {
//                 let location = locations[0];
//                 const {latitude, longitude} = location;
//                 reslove({latitude, longitude});
//               } catch (err) {
//                 reslove(null);
//               }
//             }
//           });
//         }
//       });
//     } catch (error) {
//       //-------------- Request API Failure
//       reject({
//         success: false,
//         error: JSON.stringify(error),
//       });
//     }
//   });
// };

// export {getLocation};
