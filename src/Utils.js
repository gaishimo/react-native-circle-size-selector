// @flow
export const range = (start: number, end: number) => {
  if (start > end) {
    throw new Error('second argument should be more than first argument')
  }
  const array = []
  for (var i = start; i <= end; i++) {
    array.push(i)
  }
  return array
}

type Position = { x: number, y: number }

export const getDistance = (pos1: Position, pos2: Position): number => {
  const x = Math.abs(pos1.x - pos2.x)
  const y = Math.abs(pos1.y - pos2.y)
  return Math.sqrt(x * x + y * y)
}
