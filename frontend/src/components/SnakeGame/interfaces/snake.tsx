export interface SnakeSegment {
  x: number;
  y: number;
  color: string;
}

// De momento no se usa:
export interface Snake {
  snake: SnakeSegment[];
}
