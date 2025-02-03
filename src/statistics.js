/**
 * @file Module for obtaining statistical analysis about a set of data.
 * @module src/statistics
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @author // TODO: Saskia Heinemann <sh224wg@student.lnu.se>
 * @version 2.0.0
 */

// ------------------------------------------------------------------------------
//  Type definitions
// ------------------------------------------------------------------------------

/**
 * Represents statistical summary.
 *
 * @typedef {object} StatisticalSummary
 * @property {number} average - The average value.
 * @property {number} maximum - The maximum value.
 * @property {number} median - The median value.
 * @property {number} minimum - The minimum value.
 * @property {number[]|undefined} mode - The mode value.
 * @property {number} range - The range value.
 * @property {number} standardDeviation - The standard deviation value.
 */

// ------------------------------------------------------------------------------
//  Public interface
// ------------------------------------------------------------------------------
// TODO: Write your code here.
/**
 * Function to validate the data set that is input.
 *
 * @param {number[]} numbers - the data to be analysed.
 * @throws {TypeError} - 'The passed argument is not an array.'
 * @throws {TypeError} - 'The passed array may only contain valid numbers.'
 * @throws {Error} - 'The passed array contains no elements.'
 */
function validate (numbers) {
  if (!Array.isArray(numbers)) {
    throw new TypeError('The passed argument is not an array.')
  }

  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i]
    if (typeof num !== 'number' || isNaN(num)) {
      throw new TypeError('The passed array may only contain valid numbers.')
    }
  }

  if (numbers.length === 0) {
    throw new Error('The passed array contains no elements.')
  }
}
/**
 * Calculates the average value of the data set.
 *
 * @param {number[]} theArray - the array to be analysed.
 * @throws {TypeError} - 'The passed argument is not an array.'
 * @throws {TypeError} - 'The passed array may only contain valid numbers.'
 * @throws {Error} - 'The passed array contains no elements.'
 * @returns {number} average - the average value of the data set.
 */
export function average (theArray) {
  validate(theArray)
  const mean = theArray.reduce((pre, curr) => pre + curr, 0) / theArray.length
  return mean
}

/**
 * Calculates the maximum value of the data set.
 *
 * @param {number[]} theArray - the array to be analysed.
 * @throws {TypeError} - 'The passed argument is not an array.'
 * @throws {TypeError} - 'The passed array may only contain valid numbers.'
 * @throws {Error} - 'The passed array contains no elements.'
 * @returns {number} maximum - returns the maximum value of the data set.
 */
export function maximum (theArray) {
  validate(theArray)
  const max = theArray.reduce((pre, curr) => pre > curr ? pre : curr)
  return max
}

/**
 * Calculates the minimum value of the data set.
 *
 * @param {number[]} theArray - the array to be analysed.
 * @throws {TypeError} - 'The passed argument is not an array.'
 * @throws {TypeError} - 'The passed array may only contain valid numbers.'
 * @throws {Error} - 'The passed array contains no elements.'
 * @returns {number} minimum - the minimum value of the data set.
 */
export function minimum (theArray) {
  validate(theArray)
  const min = theArray.reduce((pre, curr) => pre < curr ? pre : curr)
  return min
}

/**
 * Calculates the median value of the data set.
 *
 * @param {number[]} theArray - the array to be analysed.
 * @throws {TypeError} - 'The passed argument is not an array.'
 * @throws {TypeError} - 'The passed array may only contain valid numbers.'
 * @throws {Error} - 'The passed array contains no elements.'
 * @returns {number} median - the median value of the data set.
 */
export function median (theArray) {
  validate(theArray)
  const newArray = [...theArray].sort(function (a, b) { return a - b })
  const middleIndex = Math.floor(newArray.length / 2)
  if (newArray.length % 2 === 0) {
    return (newArray[middleIndex] + newArray[middleIndex - 1]) / 2
  } else {
    return newArray[middleIndex]
  }
}

/**
 * Calculates the mode value of the data set.
 *
 * @param {number[]} theArray - the array to be analysed
 * @throws {TypeError} - 'The passed argument is not an array.'
 * @throws {TypeError} - 'The passed array may only contain valid numbers.'
 * @throws {Error} - 'The passed array contains no elements.'
 * @returns {number} mode - the mode of the data set.
 */
export function mode (theArray) {
  validate(theArray)
  if (theArray.length <= 1) {
    return undefined
  }
  const frequencyTable = {}
  theArray.forEach(number => {
    if (!frequencyTable[number]) {
      frequencyTable[number] = 1
    } else {
      frequencyTable[number] = frequencyTable[number] + 1
    }
  })
  const max = maximum(Object.values(frequencyTable))
  const result = Object.keys(frequencyTable).filter(value => frequencyTable[value] === max)
  if (max * result.length === theArray.length) {
    return undefined
  }
  return result.map(s => Number(s)).sort(function (a, b) { return a - b })
}

/**
 * Calculates the range of the data set.
 *
 * @param {number[]} theArray - the array to be analysed.
 * @throws {TypeError} - 'The passed argument is not an array.'
 * @throws {TypeError} - 'The passed array may only contain valid numbers.'
 * @throws {Error} - 'The passed array contains no elements.'
 * @returns {number}  range - returns the range of data set.
 */
export function range (theArray) {
  validate(theArray)
  const max = maximum(theArray)
  const min = minimum(theArray)
  return max - min
}

/**
 * Calculates the standard deviation of the data set.
 *
 * @param {number[]} theArray - the array to be analysed.
 * @throws {TypeError} - 'The passed argument is not an array.'
 * @throws {TypeError} - 'The passed array may only contain valid numbers.'
 * @throws {Error} - 'The passed array contains no elements.'
 * @returns {number} standardDeviation - returns the standard deviation of a data set.
 */
export function standardDeviation (theArray) {
  validate(theArray)
  const mean = average(theArray)
  const sumOfSquareDiff = theArray.reduce((pre, curr) => pre + Math.pow(curr - mean, 2), 0)
  const result = Math.sqrt(sumOfSquareDiff / theArray.length)
  return result
}

/**
 * Returns several descriptive statistics (average, maximum, median, minimum,
 * mode, range and standard deviation) from a set of numbers.
 *
 * @param {number[]} numbers - The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array may only contain valid numbers.
 * @returns {StatisticalSummary} An object whose properties correspond to the descriptive statistics from the data set.
 */
export function summary (numbers) {
  validate(numbers)

  const averageValue = average(numbers)
  const maximumValue = maximum(numbers)
  const medianValue = median(numbers)
  const minimumValue = minimum(numbers)
  const modeValue = mode(numbers)
  const rangeValue = range(numbers)
  const standardDeviationValue = standardDeviation(numbers)

  const StatisticalSummary =
  {
    average: averageValue,
    maximum: maximumValue,
    median: medianValue,
    minimum: minimumValue,
    mode: modeValue,
    range: rangeValue,
    standardDeviation: standardDeviationValue
  }
  return StatisticalSummary
}
