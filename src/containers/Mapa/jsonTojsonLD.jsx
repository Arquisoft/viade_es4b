export default function jsonTojsonLD(rutasSC, userName) {
    const rutas = rutasSC.map(ruta => ({
        ...ruta,
        locations: ruta.locations.map(eleinterno => ({
            "schema:latitude": eleinterno.lat,
            "schema:longitude": eleinterno.lng,
            "viade:images": eleinterno.images ? eleinterno.images : []
        })),
    }));
    const userName2 = userName + "";
    const listaDivida = userName2.split("/");
    const nuevaRuta = listaDivida[0] + "//" + listaDivida[2] + "/profile/carde#me";

    const fecha = new Date();

    const data = {
        "@context": {
            "@version": 1.1,
            viade: "http://arquisoft.github.io/viadeSpec/",
            schema: "http://schema.org/",
            rdfs: "http://www.w3.org/2000/01/rdf-schema#",
            rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
            xsd: "http://www.w3.org/2001/XMLSchema#",

            name: {
                "@id": "schema:name",
                "@type": "xs:string"
            },

            description: {
                "@id": "schema:description",
                "@type": "xsd:string"
            },

            comments: {
                "@id": "viade:comments",
                "@type": "@id"
            },

            author: {
                "@id": "schema:author",
                "@type": "@id"
            },

            rutas: {
                "@id": "viade:points",
                "@container": "@list"
            },

            date: {
                "@id": "schema:DateTime",
                "@type": "xsd:dateTime"
            }
        },
        name: "Nombre de prueba",
        description: "Descripción de prueba",
        comments: "Comentario de prueba",
        author: nuevaRuta,
        date: fecha.toISOString(),
        rutas: rutas
    };

    return data;
}