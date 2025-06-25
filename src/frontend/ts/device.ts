class Device{
    id: number;
    name: string;
    description: string;
    tipo: boolean; // true = switch, false = slider
    valor: boolean | number;
    icon: number; // para indicar el string del icono
}