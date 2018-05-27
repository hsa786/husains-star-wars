// Get Minimum value of a key from an array of objects
export const getMin = (d, k) => (
  d.reduce((min, p) => parseInt(p[k]) < min ? parseInt(p[k]) : min, parseInt(d[0][k]))
);

// Get Maximum value of a key from an array of objects
export const getMax = (d, k) => (
  d.reduce((max, p) => parseInt(p[k]) > max ? parseInt(p[k]) : max, parseInt(d[0][k]))
);

// Get the relative percentage of an input between two values
export const getPercent = (input, min, max) => ((input - min) * 100) / (max - min);