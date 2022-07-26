import { writable, type Writable } from "svelte/store";

// llamado a la api
const subjects: any = writable(
    {
        'mandatory': [
            {
                id:"01.13",
                title:"Metodos numericos avanzados"
            },
            {
                id:"45.67",
                title:"Metodos numericos retrasados"
            }
        ],
        'optional': [
            {
                id:"21.43",
                title:"Analisis I"
            },
            {
                id:"15.57",
                title:"Analisis II"
            },
            {
                id:"34.66",
                title:"Fisica I"
            },
            {
                id:"85.89",
                title:"Fisica II"
            }                   
        ]
    }
)

export default subjects