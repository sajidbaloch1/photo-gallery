import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'https://hunterssocial.com/api/posts';
    private token = 'Bearer 3254|q6spZBaQlCf0zH774yKcqaH4yULjTRfxoODPuTtx';

    constructor(private http: HttpClient) { }

    async uploadImage(imageData: any) {
        try {
            const formData = new FormData();
            formData.append('content', 'Upload Image'); 
            formData.append('post_file', imageData); 

            const headers = { Authorization: this.token };
            await this.http.post<any>(this.apiUrl, formData, { headers }).toPromise();
            console.log('Image uploaded successfully');
            alert('Image uploaded successfully')
        } catch (error) {
            alert('Error uploading image')
            console.error('Error uploading image:', error);
        }
    }
}