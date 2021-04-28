import { Timestamp } from '@firebase/firestore-types';

export interface Alerta {
    id?: string;
    descricao?: string;
    ultimadata?: string;
    ultimokm?: string;
    tipoalerta?: string;
    tempoalerta?: string;
    kmalerta?: string;
    dias? : number ;
    data? : Date;
    userId?: string;
}



