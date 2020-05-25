
const intersectionBy = (cltn1, cltn2, field) => {
  let intersection = [];

  for (let i=0; i<cltn1.length; i++) {
    for (let j=0; j<cltn2.length; j++) {
      if (JSON.stringify(cltn1[i][field]) == JSON.stringify(cltn2[j][field])) {
        intersection.push(cltn1[i]);
      }
    }
  }

  return intersection;
};

export default intersectionBy;
