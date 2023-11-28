export const elevation = (size: number, height: number = 5) => ({
  elevation: size,
  shadowRadius: size,
  shadowOpacity: 0.1,
  shadowColor: 'black',
  shadowOffset: {width: 0, height},
})
