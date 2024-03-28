function getDistance(lat1, lon1, lat2, lon2) {
  // Function to calculate the distance between two coordinates using the Haversine formula
  const R = 6371; // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180; // Convert degrees to radians
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function getNearestCoordinate(
  province,
  xLatitude,
  yLongitude,
  coordinatesObject
) {
  let minDistance = Infinity;

  if (!province) {
    province = "AB";
  }

  let nearestIndex = -1;

  for (let province in coordinatesObject) {
    const provinceCoordinates = coordinatesObject[province];
    for (let i = 0; i < provinceCoordinates.length; i++) {
      const coordinate = provinceCoordinates[i];
      const distance = getDistance(
        xLatitude,
        yLongitude,
        coordinate.Latitude,
        coordinate.Longitude
      );
      if (distance < minDistance) {
        minDistance = distance;

        nearestIndex = i;
      }
    }
  }

  return coordinatesObject[province][nearestIndex];
  //   return { province: nearestProvince, index: nearestIndex };
}

// // Example usage:
// var coordinatesObject = {
//   ON: [
//     [43.65107, -79.347015], // Toronto
//     [45.42153, -75.697193], // Ottawa
//   ],
//   BC: [
//     [49.2827, -123.1207], // Vancouver
//     [48.4284, -123.3656], // Victoria
//   ],
// };

// var nearestCoordinate = getNearestCoordinate(
//   43.65107,
//   -79.347015,
//   coordinatesObject
// ); // Example coordinates for Toronto
// console.log("Nearest province:", nearestCoordinate.province);
// console.log("Nearest index:", nearestCoordinate.index);

export { getNearestCoordinate };
