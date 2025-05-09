// Particles.d.ts --> Required by Typescript.

import { FC } from "react";

// Define el tipo de props para el componente ParticlesComponent
interface ParticlesComponentProps {
  className: string;
}

// Define el tipo del componente ParticlesComponent
declare const ParticlesComponent: FC<ParticlesComponentProps>;

// Exporta el tipo
export default ParticlesComponent;