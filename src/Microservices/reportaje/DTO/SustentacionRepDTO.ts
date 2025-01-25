export class SustentacionRepDTO {
  id_sustentacion: number;
  id_tesis: number;
  id_carrera: number;
  tipo: string;
  fecha_sustentacion: Date;
  estado_sustentacion: string;
  periodo_academico: string;
  aula: string;
}
// Asegúrate de incluir este campo en la clase DTO.
