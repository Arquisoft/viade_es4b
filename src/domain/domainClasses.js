// export class TrackPoint {
//     constructor(latitude, longitude) {
//         this.latitude = latitude;
//         this.longitude = longitude;
//     }
// }

// export class Resource {

//     constructor(resourceUrl) {
//         this.resourceUrl = resourceUrl;
//     }
// }

// // TODO: Discuss and create comment structure
// export class Comment {
//     constructor(resourceUrl) {
//         this.resourceUrl = resourceUrl;
//     }
// }


// export class Route {

//     /**
//      * You are supposed to pass a map with all the necessary information
//      * @param {*} params 
//      * 
//      * Note the ifs due to the possibility of ommiting data and provide them afeterwards
//      */
//     constructor(params) {

//         if (params.name) {
//             this.name = params.name;
//         }

//         if (params.description) {
//             this.description = params.description;
//         }

//         if (params.itinerary) {
//             this.itinerary = params.itinerary;
//         }

//         if (params.comments) {
//             this.comments = params.comments;
//         }

//         if (params.resources) {
//             this.resources = params.resources;
//         }
//     }
// }