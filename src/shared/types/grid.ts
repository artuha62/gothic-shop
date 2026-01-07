export const GRID_VIEWS = ['grid3', 'grid4', 'grid8'] as const
export type GridView = (typeof GRID_VIEWS)[number]
