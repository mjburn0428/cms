export class Contact {
    //The constructor method to intiat the contact class
    constructor(
        public id: string,          //Contact ID
        public name: string,        // Contact Name
        public email: string,       // Contact email
        public phone: string,       // Contact phone number
        public imageUrl: string,    // URL of contact image
        public group: Contact[] | null // Group of contacts
    ){}
}