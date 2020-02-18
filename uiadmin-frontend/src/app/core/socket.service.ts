import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { endpoints } from '../../environments/endpoints';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class SocketService {
    socket: any;
    private readonly socketUrl: string = 'http://localhost:3000';

    constructor(private httpClient: HttpClient) { 
        this.socket = io(this.socketUrl)
    }

    listen(Eventname : string){
        return new Observable((subscriber)=>{
            this.socket.on(Eventname,(data)=>{
                subscriber.next(data);
            })
        })
    }

}
