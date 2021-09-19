export const endpoint = async (input: any) => {
  console.log(111, 'handler 1', { input })
  return input.number || 0
}
